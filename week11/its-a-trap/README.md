# Assigment

It's a Trap!
Imagine you are waiting for a job interview. A nice person picks you up from the lobby and instead of taking you to a room full of people for an interview leads you to a small room with a table, chair, and a whiteboard. They hand you an ipad with the following animation playing on it:

Animation exercises...borrowed from this codepen: http://codepen.io/nicokoenig/pen/dNgOwj
Animation exercises
...and then ask you to recreate the animations using html and css. Then they exit the room leaving you all alone :(

Activity
For this activity we will work through solving these problems should you ever find yourself in the scenario above.

After recovering from the surprise, you begin to analyze the problems and making lists of steps. Your initial list might look something like this:

Create 4 boxes and center them on the screen both vertically and horizontally.
?????
It's a start right?

Step 01:  Create a new codepen and create 4 colored squares on the screen centered vertically and spaced evenly horizontally. So that the rest of the instructions below work...lets use the following as a base style for our squares: (notice the vmin? If you haven't seen this unit before go review your CSS units)


.container {
    height: 25vmin;
    width: 25vmin;
    background-color: teal;
}
			
 
They handed you an ipad...so you decide to use it...you create a new pen and start with the following html:


<div class="container container-one"></div>
<div class="container container-two"></div>
<div class="container container-three"></div>
<div class="container container-four"></div>
			    
 
then you add some initial styles:


body {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.container {
    height: 25vmin;
    width: 25vmin;
    background-color: teal;
}
			
 
You look at the preview and are dismayed to find that while the squares are spread equally across the screen like you wanted...they are at the top of the screen instead of centered! Drat!

A bit of thinking and you remember that the default for height is auto....or "make it as big as the content is". Even though you are in a pen there is still an html and body tag around your boxes...they are sized to the height of the boxes...we need to change that. You add the following css and Voila! Vertically centered squares.


html,
body {
    height: 100%;
}
			
 
Time to expand our list. The first box with the orbiting circle doesn't look too bad...lets start with that.

Create 4 boxes and center them on the screen both vertically and horizontally.
Add a circle in the top left corner of the first box.
Make the circle move around the perimeter of the containing square clockwise.
Start at the top left corner.
move to the top right corner
move to the bottom right corner
move to the bottom left corner
move back to the top left corner
repeat
That doesn't seem too bad.

Step 02:  Add a red circle in the top left corner of the first box. Build the keyframes and add the animation that will make the motion of the circle match the example.

You make the following changes to your html:


<div class="container container-one">
    <div class="orbiting-circle"></div>
</div>
<div class="container container-two"></div>
<div class="container container-three"></div>
<div class="container container-four"></div>
			    
 
...and add the following css:


.container-one {
    padding: 1vmin;
}

.orbiting-circle {
    height: 25%;
    width: 25%;
    background-color: darkred;
    border-radius: 50%;
}
			
 
You might need to add the following as well if the padding makes your box bigger.


* {
    box-sizing: border-box;
}
			
After that we need to put some keyframes together for the animation.


@keyframes orbit {
    0% { transform: translate(0,0); }
    25% { transform: translate(300%,0%); }
    50% { transform: translate(300%,300%); }
    75% { transform: translate(0%,300%); }
    100% { transform: translate(0%,0%); }
}
			
Pretty straightforward. you can take advantage of the fact that translate is 2-dimensional. the first argument is the X translation, second is the Y translation. (The 300% was arrived at through trial and error...that's what worked for me...you may need to adjust that).

After adding the animation to the circle by adding animation: orbit 3s linear infinite; to our .orbiting-circle class we notice that the circle is moving around the square...but it's not quite right. Reviewing the example again you notice the difference...the example pauses at each corner...ours does not. How do we make it pause?

When we define keyframes we are defining what things should look like at certain points...snapshotting if you will. To add additional behavior...we need more snapshots. In this case we actually aren't going to change anything...we want to maintain a state. Something like this should work:


@keyframes orbit {
    0% { transform: translate(0,0); }
    5% { transform: translate(0,0); } /* don't change for 5% of the time...pause */
    25% { transform: translate(300%,0%); } /* start moving again */
    30% { transform: translate(300%,0%); } /* pause */
    50% { transform: translate(300%,300%); } /* move */
    55% { transform: translate(300%,300%); }
    75% { transform: translate(0%,300%); }
    80% { transform: translate(0%,300%); }
    100% { transform: translate(0%,0%); }
}
			
Perfect!

Time to expand our list again. The second box with the rotating morphing circle/square looks fairly straightforward...lets continue with that.

Create 4 boxes and center them on the screen both vertically and horizontally.
Add a circle in the top left corner of the first box.
Make the circle move around the perimeter of the containing square clockwise.
Start at the top left corner.
move to the top right corner
move to the bottom right corner
move to the bottom left corner
move back to the top left corner
repeat
Add a circle in the center of the second box.
Make the circle change to a white square, then rotate, then change back.
Start with border radius 50% and red color
change border radius to 0, color to white
rotate 90deg
change border radius back to 50% and color back to red
repeat
Step 03:  Add a red circle in the center of the second box. Build the keyframes and add the animation that will make the motion of the circle match the example.

You make the following changes to your html:


<div class="container container-one">
    <div class="orbiting-circle"></div>
</div>
<div class="container container-two">
    <div class="morphing-circle"></div>
</div>
<div class="container container-three"></div>
<div class="container container-four"></div>
			    
 
...and add the following css:


.container-two {
	display: flex;
	justify-content: center;
	align-items: center;
}

.morphing-circle {
    height: 25%;
    width: 25%;
    background-color: red;	
}
			
 
You realize that this would be easy to do with a transition. It would look something like this:


.morphing-circle {
    height: 25%;
    width: 25%;
    background-color:darkred;	
    border-radius: 50%;
    transition: border-radius .5s ease, 
                background-color .5s ease, 
                transform .5s ease .5s;
}
.container-two:hover .morphing-circle {
    border-radius: 0;
    background-color:  white;
    transform: rotate(90deg);
}
			
 
...But that would require the hover to trigger it...and wouldn't go on forever...it's going to have to be an animation with keyframes again. Let's build the keyframes first.


@keyframes morphing-circle-square {
    50% {
        border-radius: 0%;
        background-color: white;      
    }
    75% {
        transform: rotate(90deg);    
    }
    100% {
        border-radius: 50%;
        background-color: darkred;
    }
}
You try that first. Looking at your list it seems to make sense...about halfway through the animation it should change to a white square...then it should rotate...the turn back to a red circle. But what you see once you add animation: morphing-circle-square 3s linear infinite; to your .morphing-circle class is this:

Animation exercises...circle morph...not quite right
First shot at the Circle morph
Ack! Why is it doing that? If you look at the keyframes above again...read it like this:

Between 0% and 50% change from round to square and red to white.
between 0% and 75% rotate 90deg
between 50% and 100% change from square to circle and white to red.
between 100% and 50% change back to square/white...and rotatation resets back to 0deg
If you think about it...that's not what we need to happen...If you look at the original animation...it really does this:

when the animation starts make sure you are a circle
stay a red circle from 0 - 25%
between 25%-50% change from round to square and red to white...but don't start rotating yet
between 50% and 75% stay a white square, and rotate 90deg
between 75% and 100% stay rotated at 90deg, but change back to a red circle.
The keyframes for that will look something like this:


@keyframes morphing-circle-square {
    0% {border-radius: 50%}
    25% { /*(if you don't add both red and circle here it will start changing one or the other before you are ready) */
        border-radius: 50%;
        background-color: darkred;
    }
    50% { /* now change to white square...but don't start rotating yet! */
        border-radius: 0%;
        background-color: white;
        transform: rotate(0deg);
    }
    75% { /* stay a white square, but rotate 90deg */
        border-radius: 0%;
        background-color: white;
        transform: rotate(90deg);   
    }
    100% { /* stay rotated at 90, but change back to a circle */
        border-radius: 50%;
        background-color: darkred;
        transform: rotate(90deg);
    }
}
            
Much better. Problem 2 solved!

Step 04:  Complete this activity by adding the steps to solve either problem 3 or 4 to our list above. Then post your list and Codepen URL with your working code for the first 2 examples to Ilearn.

Feel free to actually code 3 or 4 as well. They are both good exercises...but the solutions are not required. Only the steps you would follow to solve them. If you choose #4, I just noticed that my animation is a smidge short...it looks like it's a pattern of 2 beats then one beat. It should just be a repeating 2 beat pattern.

Grading
Codepen URL has working examples for the first 2 animations. 5pts
List provided with the steps to solve either example 3 or 4 added. 5pts

# Solution for number one and two animations:

https://codepen.io/wemf/pen/ZEpYaeK (Links to an external site.)

Steps for animation number four:

- Create a div inside the container four, with a classname such as "beating-circle".

- Use the display (flex), justify-content, and align-items properties in the container to align the circle

- Create the circle shape with the class "beating-circle" using border-radius, color, width and height.

- Create de animation using @keyframes, with the property transform, use the scale value, and make the shape bigger and normal in the desired interval.

- Add the animation in the "beating-circle" class and join it with a transition.