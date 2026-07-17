export default function buildClaimTree(claims = []) {
  const map = new Map();

  // Create nodes
  claims.forEach((claim) => {
    map.set(claim.id, {
      ...claim,
      children: [],
    });
  });

  const roots = [];

  // Build hierarchy
  map.forEach((claim) => {
    if (
      claim.dependentOn &&
      map.has(claim.dependentOn)
    ) {
      map.get(claim.dependentOn).children.push(claim);
    } else {
      roots.push(claim);
    }
  });

  // Sort recursively
  function sortTree(nodes) {
    nodes.sort((a, b) => a.number - b.number);

    nodes.forEach((node) => sortTree(node.children));
  }

  sortTree(roots);

  return roots;
}