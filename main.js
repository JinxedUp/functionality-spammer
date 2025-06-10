const readline = require('readline');
const chalk = require('chalk').default;
const spammer = (`

        ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗ █████╗ ██╗     ██╗████████╗██╗   ██╗
        ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔══██╗██║     ██║╚══██╔══╝╚██╗ ██╔╝
        █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████║██║     ██║   ██║    ╚████╔╝ 
        ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║██╔══██║██║     ██║   ██║     ╚██╔╝  
        ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║██║  ██║███████╗██║   ██║      ██║   
        ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝   
                                                                                                           
    
`)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.clear()
process.stdout.write('\x1b]2;Functionality june 10th 2025\x07');
//ask questions
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        })
    })
}

//send messages
async function sendMessage(token, channelId, message) {
    try {
        const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: message
            })
        });

        if (response.ok) {
            console.log(chalk.green('Message sent successfully!'));
        } else {
            const error = await response.text();
            console.log(chalk.red('Error sending message:', error));
        }
    } catch (error) {
        console.log(chalk.red('Network error:', error.message));
    }
}

//functionality 
async function main() {
    console.log(chalk.magenta(spammer));
    console.log(chalk.red('                                           WARNING: ban risk is never 0 with any script'));
    console.log(chalk.magenta('========================================================================================================================\n'));

    try {
        // Get user input
        const token = await askQuestion(chalk.magenta('                                           Enter your Discord token: '));
        console.clear()
        console.log(chalk.magenta(spammer));
        console.log(chalk.red('                                           WARNING: ban risk is never 0 with any script'));
        console.log(chalk.magenta('========================================================================================================================\n'));// now that i think about it, i shouldve used const like i used for spammer instead of having to print the same thing over and over again for it to look good.
        const channelId = await askQuestion(chalk.magenta('                                           Enter the channel ID: '));
        console.clear()
        console.log(chalk.magenta(spammer));
        console.log(chalk.red('                                           WARNING: ban risk is never 0 with any script'));
        console.log(chalk.magenta('========================================================================================================================\n'));
        const message = await askQuestion(chalk.magenta('                                           Enter the message to send: '));
        console.clear()
        console.log(chalk.magenta(spammer));
        console.log(chalk.red('                                           WARNING: ban risk is never 0 with any script'));
        console.log(chalk.magenta('========================================================================================================================\n'));
        console.log(chalk.green('\nStarting to send messages every 5 seconds...'));
        console.log(chalk.green('Press Ctrl+C to stop\n'));

        const interval = setInterval(() => {
            const randomString = Math.random().toString(36).substring(2, 8); // randomized
            const finalMessage = message + " " + randomString;
            sendMessage(token, channelId, finalMessage);
        }, 5000);

        process.on('SIGINT', () => {
            console.log(chalk.yellow('\nStopping script...'));
            clearInterval(interval);
            rl.close();
            process.exit(0);
        });

    } catch (error) {
        console.log('Error:', error.message);
        rl.close();
    }
}


main();
