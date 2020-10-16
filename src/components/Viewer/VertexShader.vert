uniform int normalShading;

attribute float vertexNumber;

varying vec3 vNormal;
varying vec3 vBC;

void main() {
  if (normalShading == 1) {
    // Don't apply view matrix correction to normals if we want to display them
    // as colors. This would be inaccurate if any of the models were rotated or
    // scaled, but since none are, we can skip that.
    vNormal = normal;
  } else {
    vNormal = normalMatrix * normal;
  }

// Convert vertex number to barycentric coordinates.
  if (vertexNumber == 0.0) {
    vBC = vec3(1.0, 0.0, 0.0);
  } else if (vertexNumber == 1.0) {
    vBC = vec3(0.0, 1.0, 0.0);
  } else {
    vBC = vec3(0.0, 0.0, 1.0);
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
