

document.addEventListener("DOMContentLoaded", () => {
    const scene = document.querySelector("a-scene");
    const topDownButton = document.getElementById("topDownButton");
    const orthographicButton = document.getElementById("orthographicButton");
    const camera = document.getElementById("mainCamera");
  
    const columnLeft = document.getElementById("column-left");
    const columnRight = document.getElementById("column-right");
  
    let isTopDown = false; // Track if the view is in top-down mode
    const maxZ = 20; // Maximum downward limit for the camera
    const minZ = -15; // Maximum upward limit for the camera
    const planeMoveSpeed = 0.1; // Speed of plane movement
  
    // Add boundaries for the columns
    const maxColumnZ = -18; // Highest the columns can move
    const minColumnZ = -5; // Lowest the columns can move
  
    // Switch to Top-Down View
    topDownButton.addEventListener("click", () => {
      console.log("Top-Down Button Clicked");
  
      // Update camera attributes for top-down view
      camera.setAttribute("look-controls", "enabled: false");
      camera.setAttribute("position", "0 30 -15");
      camera.setAttribute("rotation", "-90 0 0");
      camera.setAttribute("projection", "orthographic");
  
      // Configure orthographic projection settings
      camera.setAttribute("top", "5");
      camera.setAttribute("bottom", "-5");
      camera.setAttribute("left", "-5");
      camera.setAttribute("right", "5");
      camera.setAttribute("near", "0.1");
      camera.setAttribute("far", "100");
  
      isTopDown = true;
    });
  
    // Switch to Original View
    orthographicButton.addEventListener("click", () => {
      console.log("Orthographic Button Clicked");
  
      // Restore camera attributes for original perspective view
      camera.setAttribute("look-controls", "enabled: true");
      camera.setAttribute("position", "0 1.6 4");
      camera.setAttribute("rotation", "0 0 0");
      camera.setAttribute("projection", "perspective");
  
      isTopDown = false;
    });
  
    // Scroll event to move columns
    window.addEventListener("wheel", (event) => {
      if (!isTopDown) return;
  
      // Adjust the camera position based on scroll direction
      const position = camera.getAttribute("position");
      let newZ = parseFloat(position.z) + event.deltaY * 0.1; // Scale the scroll sensitivity
      newZ = Math.max(minZ, Math.min(maxZ, newZ)); // Clamp Z value
  
      camera.setAttribute("position", { x: position.x, y: position.y, z: newZ });
  
      // Move planes based on scroll direction
      const leftPosition = columnLeft.getAttribute("position");
      const rightPosition = columnRight.getAttribute("position");
  
      // Clamp the new Z position for both columns
      const newLeftZ = Math.max(minColumnZ, Math.min(maxColumnZ, parseFloat(leftPosition.z) - event.deltaY * planeMoveSpeed));
      const newRightZ = Math.max(minColumnZ, Math.min(maxColumnZ, parseFloat(rightPosition.z) - event.deltaY * planeMoveSpeed));
  
      // Update the positions of the columns
      columnLeft.setAttribute("position", {
        x: leftPosition.x,
        y: leftPosition.y,
        z: newLeftZ,
      });
  
      columnRight.setAttribute("position", {
        x: rightPosition.x,
        y: rightPosition.y,
        z: newRightZ,
      });
    });
  
    console.log("Scene and buttons initialized successfully.");
  });
  