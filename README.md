# Rocket League Overlay 3D-Gaming
<p style="margin-top: 0; margin-bottom: 4rem">Rocket League Overlay commissioned by 3D-Gaming</p>

# Setup:

## Must be installed:
<ul style="margin-bottom: 2rem">
    <li><a href="https://www.rocketleague.com/">Rocket League</a></li>
    <li><a href="https://www.bakkesmod.com/">Bakkesmod</a></li>
    <li><a href="https://nodejs.org/en/">Node.js</a></li>
    <li><a href="https://gitlab.com/bakkesplugins/sos/sos-plugin">SOS-Plugin</a></li>
    <li><a href="https://gitlab.com/bakkesplugins/sos/sos-ws-relay">Web-Socket-Server</a></li>
    <li><a href="https://github.com/marcelnoehre/Overlay-3DRL.git">Overlay Files</a></li>
</ul>

## Download Overlay:
1) Create a folder to save the files
2) Open the Command Prompt (cmd)
3) Navigate into the created folder (cd {route})
4) Type: "git clone https://github.com/marcelnoehre/Overlay-3DRL.git"
<p style="margin-bottom: 2rem"></p>

<p style="margin-bottom: 4rem">
P.S. You can find a tutorial to install the SOS-Plugin and the Web-Socket-Server 
<a href="https://www.youtube.com/watch?v=QE816DBuwI4&t">here</a>
</p>

# Launch Web-Socket-Server

## Launch Socket Server:
1) Start Bakkesmod as administrator
2) Start Rocket League
3) Open the Command Prompt (cmd)
4) Navigate into the folder of the Web-Socket-Server (cd {route})
5) Type "node ws-relay" 
6) If you see the green "SUCESS: Connected to Rocket League on localhost:{port}" the Socket Server is running.

**Do not click into the console, the web socket server will then pause to update the game information!**
<p  style="margin-bottom: 2rem"></p>

## Restart Server:
1) Open Command Propt (cmd) with running Web-Socket-Server 
2) ctrl + c
3) Type "node ws-relay"
<p style="margin-bottom: 4rem">If you see the green "SUCESS: Connected to Rocket League on localhost:{port}" again, the server is restarted.</p>

# Streamer Information:

## Ingame Settings:
To make sure the Rocket League interface fits into the Overlay, you have to adjust the interface settings:
1) INTERFACE SCALE => 100%
2) DISPLAY SCALE => 100%
<p style="margin-bottom: 2rem"></p>

## Stream Settings:
1) Set the resolution to: 1920x1080
2) Add a fullscreen Game Capture as the background layer
3) Copy the route of the "index.html" in the overlay folder
4) Add the route in form of a Browser Source as the front layer

**If the Overlay doesn't show any values, hide and show it again to refresh the html-page!**