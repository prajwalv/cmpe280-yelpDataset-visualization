var lineReader = require('line-reader');

/**
 * Send the contents of an HTML page to the client.
 * @param fileName the name of the file containing the HTML page.
 * @param result the HTTP result.
 */
function sendPage(fileName, result)
{
    var html = '';
    
    // Read the file one line at a time.
    lineReader.eachLine(fileName,
        /**
         * Append each line to string html.
         * Send the contents of html to the client
         * after the last line has been read.
         * @param line the line read from the file.
         * @param last set to true after the last line.
         */
        function(line, last)
        {
            html += line + '\n';

            if (last) 
            { 
                result.send(html);
                return false; 
            }
            else
            {
                return true;
            }
        });
}

/**
 * Send the contents of an HTML page to the client
 * with an inserted body text.
 * @param text the body text.
 * @param result the HTTP result.
 */
function sendBody(text, result)
{
    var html = '<!DOCTYPE html>\n'
        + '<html lang="en-US">\n'
        + '<head>\n'
        + '    <meta charset="UTF-8">\n'
        + '    <title>Form Examples</title>\n'
        + '</head>\n'
        + '<body>\n'
        + '    ' + text + '\n'  // insert the body text
        + '</body>\n'
        + '</html>\n';
    
    result.send(html);    
}

/**
 * Extract the first and last names from the request.
 * @param request the HTTP request.
 * @returns a string containing the first and last names.
 */
function getName(request)
{
    var firstName = request.param('firstName');
    var lastName  = request.param('lastName');
    
    return firstName + ' ' + lastName + '!';
}

/**
 * Extract the strong and emphasized values from the request.
 * Surround the text with <strong> or <em> tags.
 * @param text the text to surround.
 * @param request the HTTP request.
 * @returns a string containing the surrounded text.
 */
function modify(text, request)
{
    if (request.body.strong)
    {
        text = '<strong>' + text + '</strong>'; 
    }
    
    if (request.body.em)
    {
        text = '<em>' + text + '</em>'; 
    }
    
    return text;
}

/*
 * GET home page.
 */
module.exports.home = function(request, result) 
{
    sendPage('app_server/views/html/index.html', result);
};

/*
 * GET register page.
 */
module.exports.register = function(request, result) 
{
    sendPage('app_server/views/html/register.html', result);
};

