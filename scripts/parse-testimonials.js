const fs = require('fs');

async function inspectMatches() {
  const html = await fetch('https://www.swadeep.org/').then(r => r.text());
  
  // Find all testimonial blocks
  // In Woodmart theme, testimonials are usually in <div class="testimonials-wrapper ..."> or <div class="testimonial-content"> or similar
  const pattern = /<div class="[^"]*testimonial-inner[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  let matches = [...html.matchAll(pattern)];
  
  if (matches.length === 0) {
    const pattern2 = /<div class="[^"]*testimonial[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
    matches = [...html.matchAll(pattern2)];
  }

  console.log(`Found ${matches.length} matches`);

  // Let's search around "testimonial-avatar" or "testimonial-content"
  const chunks = html.split('<div class="testimonial');
  console.log('Split count:', chunks.length);

  chunks.slice(1).forEach((chunk, i) => {
    console.log(`\n=================== REVIEW ${i + 1} ===================`);
    // Extract avatar src
    const avatarMatch = chunk.match(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*title=["']([^"']*)["']/i) ||
                        chunk.match(/<img[^>]+src=["']([^"']+)["']/i);
    const avatar = avatarMatch ? avatarMatch[1] : '';

    // Extract quote / text
    const contentMatch = chunk.match(/<div class="[^"]*testimonial-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                         chunk.match(/<div class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    
    // Extract name
    const authorMatch = chunk.match(/<span class="[^"]*testimonial-author[^"]*"[^>]*>([\s\S]*?)<\/span>/i) ||
                        chunk.match(/<h[1-6][^>]*class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/h[1-6]>/i);

    // Extract title / designation
    const roleMatch = chunk.match(/<span class="[^"]*testimonial-role[^"]*"[^>]*>([\s\S]*?)<\/span>/i);

    console.log('Avatar:', avatar);
    console.log('Raw text in chunk (first 1000 chars):');
    const clean = chunk.substring(0, 1000).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(clean);
  });
}

inspectMatches().catch(console.error);

