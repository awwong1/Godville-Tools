# Godville-Tools
 A collection of tools for interacting with the Godville game. Most of them will be automation tools like auto Punish or auto Encourage.

# To Run
You need to have `casperjs`, `nodejs` and `npm` installed globally on your machine (using the `-g` option).

After that you can simply run `casperjs server.js` on the command line and the script will start.

The script will ask you for your God's name and password but you also specify them as arguments when running the script:

    casperjs server.js --god=god_name --pass=password


If you wish to stop the script you can do so at any time with `Ctrl+c`

Be sure you have a working internet connection.

# Todo
There is a lot to do, for the moment the only thing that it does is 'Encourage' your hero. Some needed features would be:
<ul>
  <li>Let the user know if the credentials are incorrect.</li>
  <li>Ability to choose whether we want to encourage the hero or punish it </li>
  <li> Make a menu that displays all the different options. </li>
</ul>
