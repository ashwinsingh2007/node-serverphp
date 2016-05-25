var http=require('http'),
	port=process.argv[3],
	host=process.argv[2],
	fs=require('fs'),
	path=require('path'),
	url = require("url"),
	serverPhp = require('./lib.js');
 
var serverphp = new serverPhp(
{
	host: '127.0.0.1',
	port: 9000,
});

var server=http.createServer(function(req,res)
{
	
	if(req.url==='/')
		{
			var filePath=__dirname+"/www/index.html";
			fs.exists(filePath,function(file_exists)
			{
				if(file_exists)
				{
					res.writeHead(200,{'Content-Type':'text/html'});
					var read=fs.createReadStream(filePath).pipe(res);
				}
				else
				{
					filePath=__dirname+"/www/index.php";

					fs.exists(filePath,function(file_exists)
					{
						if(file_exists)
						{

							res.writeHead(200,{'Content-Type':'text/html'});
							serverphp.cgistart({uri:filePath,query:'none'},'GET', function(err, output, phpErrors)
							{
								res.end(output);
							});
						}
						else
						{
							res.writeHead(404);
							res.end("File Not Found !!");
						}
					})
				}
			})
			
			

		}
		
		
	else if(req.method==='GET')
	{

		
		var extname=path.extname(req.url);
		if(extname[0]==='.'&&extname[1]==='p'&&extname[2]==='h'&&extname[3]==='p')
		{
			var filePath=__dirname+"/www"+req.url;
			filePath+='?';
			var localPath='';
			var i=0;
			var param = url.parse(req.url).query;

			while(1)
			{
				if(filePath[i]==='?')
				{
					break;
				}
				else
				{
					localPath+=filePath[i];
					i++;
				}
			}
			fs.exists(localPath,function(file_exists)
			{
				if(file_exists)
				{
					res.writeHead(200,{'Content-Type':'text/html'});
					 
					serverphp.cgistart({uri:localPath,query:param},'GET', function(err, output, phpErrors)
					{
						res.end(output);
					});
				}
				else
				{
					res.writeHead(404);
					res.end('File Not Found!!');
				}
			})
			
		}	
		else
		{
			var filePath=__dirname+"/www"+req.url;
			fs.exists(filePath,function(file_exists)
			{
				if(file_exists)
				{
					fs.createReadStream(filePath).pipe(res);
				}
				else
				{
					res.writeHead(404);
					res.end("File not found");
				}
			})
		}		
		
	}
	else if(req.method==='POST')
	{

		var extType=path.extname(req.url);
		var filePath=__dirname+"/www"+req.url;
		fs.exists(filePath,function(file_exists)
		{
			if(file_exists)
			{
				res.writeHead(200,{'Content-Type':'text/html'});
				if(extType==='.php')
				{
					var chunk='';
					req.on('data',function(data)
					{
						chunk=chunk+data;
						
					})
					
					req.on('end',function()
					{
						
						serverphp.cgistart({uri:filePath,form:chunk},'POST', function(err, output, phpErrors)
						{
							res.end(output);
						});
					})
					
				}
			}
			else
			{
				res.writeHead(404);
				res.end('File Not Found!!');
			}
		})
			

	}


});
server.listen(port,host,function()
{
	console.log('Server running on '+host+' at port '+port+' ......');
});




 
