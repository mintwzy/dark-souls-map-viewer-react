uniform vec3 edgeColor;
uniform int edgeHighlight;
uniform int edgeAttenuation;
uniform int wrapAround;
uniform int normalShading;

uniform vec3 ambientLightColor;

#if MAX_DIR_LIGHTS > 0
uniform vec3 directionalLightDirection[MAX_DIR_LIGHTS];
uniform vec3 directionalLightColor[MAX_DIR_LIGHTS];
#endif

varying vec3 vNormal;
varying vec3 vBC;

// Calculates closeness to edge of triangle.
float edgeFactor() {
  vec3 d = fwidth(vBC);
  vec3 a3 = smoothstep(vec3(0.0), d, vBC);
  return min(min(a3.x, a3.y), a3.z);
}

void main() {
  vec3 normal = normalize(gl_FrontFacing ? vNormal : -vNormal);

// Ambient lighting.
  vec3 faceColor = ambientLightColor;

  // Basic lambert shading for directional lights only.
  if (normalShading == 0) {
  #if MAX_DIR_LIGHTS > 0
    for (int i = 0; i < MAX_DIR_LIGHTS; i++) {
      float intensity = dot(normal, normalize(directionalLightDirection[i]));

      // With wrapAround, light intensity drops to 0 only directly opposite the
      // light, rather than perpendicular and beyond.
      if (wrapAround == 1) {
        intensity = 0.5 + 0.5 * intensity;
      }
      intensity = clamp(intensity, 0.0, 1.0);

      faceColor += directionalLightColor[i] * intensity;
    }
  #endif

  // Show surface normal in place of computed color.
  } else {
    if (wrapAround == 1) {
      faceColor = vec3(0.5) + 0.5 * normal;
    } else {
      faceColor = normal;
    }
  }

  // Highlight edges.
  if (edgeHighlight == 1) {
    float depthFactor = clamp(gl_FragCoord.z / gl_FragCoord.w * 0.003, 0.0, 1.0);
    vec3 newEdgeColor = mix(edgeColor, faceColor, depthFactor * float(edgeAttenuation));
    faceColor = mix(newEdgeColor, faceColor, edgeFactor());
  }

  gl_FragColor = vec4(faceColor, 1.0);
}
