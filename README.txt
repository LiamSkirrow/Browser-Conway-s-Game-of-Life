README

ideas:
TODO  - Include a 'Generation' counter, which indicates the current number of iterations
DONE  - a slider to control the speed of the iterations (sleep() function)
DONE  - a drop down menu to control the pixel size (selectable from: small/medium/large)
DONE  - a colour menu to determine the colour of the pixels when clicked
DONE  - a button to toggle on/off a thin grid (the border for each pixel element) to make it
        easier to see individual pixels
TODO? - perhaps a small paragraph under the canvas, of the details of this website/context for CGOL

*********************************************************************************************************************
TODO  - make this into a more general cellular automota application. Include a drop down menu where you can choose
        between Conway's Game of Life, and a whole host of other Cellular Automota 'games'.
*********************************************************************************************************************


BUGS:
- Currently, changing the size of the pixels results in the pixelArray containing too many elements... this 
  is due to (I think) the clearCanvas() function not clearing the canvas properly. The initial starting pixel size
  is represented correctly however, so the app can be used for further development as long as the pixel size is not changed.
- the slider does not update the time dynamically, so it must be released in order to set the delayTime parameter.
- figure out how/where to display the generation counter
- change the pixel colour instantly, not on the next frame. Must loop through the array and re-assign every non-black pixel to the value of pixelColour.
- the grid disappears when changing the pixel size