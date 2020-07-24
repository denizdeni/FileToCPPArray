const fs = require("fs");
const prompt = require('prompt');

var file_name = "";
var array_name = "";

function onErr(err) {
    console.log(err);
    return 1;
}

function Start()
{
	prompt.start();
	
	prompt.get(['file_name', 'var_name'], function (err, result) {
		if (err) { return onErr(err); }
		console.log('Command-line input received:');
		console.log('  File name: ' + result.file_name);
		array_name = result.var_name;
		file_name = result.file_name;
		
		var outString = "unsigned char " + array_name + "[";

		fs.readFile('./' + file_name, function read(err, data) {
			if (err) {
				return onErr(err);
			}
			
			const content = data;

			// Invoke the next step here however you like
			console.log(content);   // Put all of the code here (not the best solution)
			var arr = Array.prototype.slice.call(content, 0);
			var count = 0;
			outString +=  arr.length + "] = \n{ ";
			
			for(var i = 0; i < arr.length; i++)
			{
				count++;
				
				if((arr.length - 1) != i)
				{
					outString += " 0x" + arr[i].toString(16).toUpperCase() + ",";
					if(count > 20)
					{
						outString += "\n";
						count = 0;
					}
				}
				else
				{
					outString += "0x" + arr[i].toString(16).toUpperCase() + " };";
				}
				
			}
			
			fs.writeFile("./" + file_name + ".out", outString, function(err) {
				if(err) {
					return console.log(err);
				}
				console.log("The file was saved!");
			}); 
		});
	});
}
Start();
