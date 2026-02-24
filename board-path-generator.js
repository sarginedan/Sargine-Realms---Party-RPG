// Dynamic Winding Board Path Generator
// Creates a natural, flowing path that winds through the environment

export function generateWindingPath(numSpaces, centerRadius = 20) {
    const points = [];
    const angles = [];
    
    // Create an X-shaped loop (Lissajous-inspired or Clover shape)
    // centerRadius is used as the base extent of the arms
    for (let i = 0; i < numSpaces; i++) {
        // Uniformly distribute angle around the circle
        const angle = (i / numSpaces) * Math.PI * 2;
        
        // Use a 4-lobed polar function to create an X-shape
        // We want peaks at 45, 135, 225, 315 degrees (the arms of the X)
        // sin(2 * theta) peaks at these angles
        const lobeMagnitude = 0.7; // How "pinched" the X is
        const r = centerRadius * ( (1 - lobeMagnitude) + lobeMagnitude * Math.abs(Math.sin(2 * angle)) );
        
        // Calculate position
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        
        // No Y variation - everything on the floor
        points.push({ x, z, angle });
        angles.push(angle);
    }
    
    return { points, angles };
}

export function getSpaceGeometry(index, spaceType) {
    // Different geometry types for different spaces
    const geometries = {
        quest: 'hexagon',    // 6-sided
        battle: 'octagon',   // 8-sided
        shop: 'circle',      // Circular
        event: 'star'        // Star shape
    };
    
    return geometries[spaceType] || 'hexagon';
}

export function getSpaceSize(geometryType) {
    // OPTIMIZED: Reduced by another 25% to prevent tile overlap
    const sizes = {
        hexagon: 7.03,    // Quest spaces
        octagon: 7.87,    // Battle spaces
        circle: 6.47,     // Shop spaces
        star: 8.44        // Event spaces
    };
    
    return sizes[geometryType] || 7.03;
}
