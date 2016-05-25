var fastcgiConnector = require('fastcgi-client');
module.exports = serverphp;


function serverphp(options)
{
	

	this.options = options;
	var self = this;
	options.skipCheckServer = true;
	this.fastcgiclient = fastcgiConnector(options);
	this.ready = false;
	this.fastcgiclient.on('ready', function()
	{
		self.ready = true;
		self._clearQueue();
	});
	this.queue = [];
}


serverphp.prototype._clearQueue = function()
{
	var evt;
	while(evt = this.queue.shift())
	{
		this.run(evt.info,evt.mthod, evt.cb);
	}
};


serverphp.prototype.cgistart = function(info,mthod, cb)
{
	

	if (!this.ready)
	{
		this.queue.push({info: info,mthod: mthod, cb:cb});
		return;
	}
	
	if (info.form && mthod != 'GET')
	{
		info.body=info.form;
	}

	if (mthod == 'POST')
	{
		info.body = new Buffer(info.body, 'utf8');
		info.contentType = 'application/x-www-form-urlencoded';
		info.contentLength = info.body.length;
	}


	
	

	var HELLOWORLD_PARAMS = 
	{
		QUERY_STRING:info.query||'',
		REQUEST_METHOD: mthod,
		CONTENT_TYPE: info.contentType ||'',
		CONTENT_LENGTH: info.contentLength ||'',
		SCRIPT_FILENAME: info.uri,
		SCRIPT_NAME: '',
		REQUEST_URI: info.uri,
		DOCUMENT_URI: info.uri,
		DOCUMENT_ROOT: this.options.documentRoot,
		SERVER_PROTOCOL: 'HTTP/1.1',
		GATEWAY_INTERFACE: 'CGI/1.1',
		REMOTE_ADDR: '127.0.0.1',
		REMOTE_PORT: 1234,
		SERVER_ADDR: '127.0.0.1',
		SERVER_PORT: 80,
		SERVER_NAME: '127.0.0.1',
		SERVER_SOFTWARE: '',
		REDIRECT_STATUS: 200
	};

	var self = this;

	self.fastcgiclient.request(HELLOWORLD_PARAMS, function(err, request)
	{
		if (err)
		{
			cb(99, err.toString(), err.toString());
			return;
		}

		var body = '',errors = '';
		request.stdout.on('data', function(data)
		{
			body += data.toString('utf8');
		});

		request.stderr.on('data', function(data)
		{
			errors += data.toString('utf8');
		});
		
		request.stdout.on('end', function()
		{
			body = body.replace(/^[\s\S]*?\r\n\r\n/, '');
			cb(false, body, errors);
		});

		if (mthod == 'POST')
		{
			request.stdin._write(info.body, 'utf8');
			//console.log(info.body);
		}
		request.stdin.end();
	});
};
