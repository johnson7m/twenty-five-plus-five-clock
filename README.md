# twenty-five-plus-five-clock
25 + 5 Clock For FCC Front End Libraries Course


Project written in React

Notes
1.) used fontawesome react codepen script to preprocess icons, however in the local version I just use the fontawseome npm modules and use the component <FontAwesomeIcon/> 

2.) otherwise very straight forward project. It's an adjustable timer that alternates between both a "break" and "session" making a little noise everytime the timer hits zero and starting over. Can be paused.

3.) !IMPORTANT : the way React batches state makes the buttons slow to update, sometimes you might have to click multiple times before a tick. I used setState({ prevState => .... }) for the increments/decrements. If this were an app for production I would 100% change this as it is quite frustrating to have to deal with the slow ticks. 

4.) local and online environment used. src code provided needs node, react, and fontawesome modules installed. 
