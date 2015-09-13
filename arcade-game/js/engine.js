
/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */


var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 909;
    canvas.height = 606;
    // Add the canvas to the gameContainer div of the page.
    $('#gameContainer').append(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */

        if (game.gameHasStarted) {
        // Checks to see if the game has started yet
            if (game.gameOver) {
            // Runs the game over screen if the game is over
                gameOverScreen();
            }
            else {
                if (game.resetGame) {
                    resetGame();
                }
                else {
                    update(dt);
                    render();
                }
            }
        }
        else {
        // If the game hasn't started yet, runs the menu screen
            menu();
        }
        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */

        // Requests the next frame, continuing the game loop
        win.requestAnimationFrame(main);

    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */

    function init() {
        lastTime = Date.now();
        main();
    }

    function gameOverScreen() {
    // Displays the game over screen

        textBox(305, 160, 300, 220);
        textBox(305, 420, 300, 110);
        ctx.font = '96px Arial';
        ctx.fillText('GAME', 315, 250);
        ctx.fillText('OVER', 315, 350);
        ctx.font = '36px Arial';
        ctx.fillText('Press Enter', 360, 460);
        ctx.fillText('To Try Again', 355, 510);
    }

    function resetGame() {
    // Displays the reset screen

        textBox(305, 210, 300, 220);
        ctx.font = '42px Arial';
        ctx.fillText('Are you sure?', 325, 300);
        ctx.fillText('Y/N?', 405, 370);
    }

    function textBox(x, y, w, h) {
    // A helper function for drawing text boxes on the screen
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.rect(x + 5, y + 5, w - 10, h - 10);
        ctx.fillStyle = 'black';
        ctx.stroke();
    }

    function menu() {
    // Displays the menu as long as the game has not started

        // Draw the backgrond
        renderBackground();

        // Draw the cursor
        game.renderCursor();

        // Draw the five character options
        for (var i = 0; i<game.characters.length; i++) {
            ctx.drawImage(Resources.get(game.characters[i]), i * 202, 405);
        }

        // Draw the game logo
        ctx.drawImage(Resources.get('images/logo.png'), 85, 175);
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        // Clean up enemies that have already passed
        removeEnemies();
        // Add more enemies if the array is getting too small
        if (allEnemies.length < 25) {
            addEnemies();
        };
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        // Update enemies
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        // Update player
        player.update();
    }

    function renderBackground() {

        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 9,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        if (game.gameHasStarted) {
            // Draw the exit block
            ctx.drawImage(Resources.get('images/stone-block.png'), game.level.exitPosition * 101, 0)

            // Because of the overlapping nature of the images, we redraw the tiles under the exit block
            for (row = 1; row < numRows; row++) {
                ctx.drawImage(Resources.get(rowImages[row]), game.level.exitPosition * 101, row * 83);
            }
        }

    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {

        renderBackground();

        // Display the score and the number of remaining lives
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + game.score, 5, 75);
        ctx.fillText('Lives: ' + game.lives, 817, 75);


        // Draw the enemies, player, and other objects
        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        // Draw the player and any hearts and stars
        player.render();
        game.level.heart.render();
        game.level.star.render();
    }



    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Selector.png',
        'images/Heart.png',
        'images/Star.png',
        'images/logo.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;

})(this);
