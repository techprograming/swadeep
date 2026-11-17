const fs = require('fs');

async function extract() {
  const html = await fetch('https://www.swadeep.org/').then(r => r.text());
  
  // Find where testimonials or what they say is located
  const names = ['Pradeep Kumar Ghosal', 'American India Foundation', 'Dadra and Nagar Haveli', 'Dishaben', 'Vinodbhai'];
  
  const reviews = [];

  for (const name of names) {
    let pos = 0;
    while ((pos = html.indexOf(name, pos)) !== -1) {
      const start = Math.max(0, pos - 1000);
      const end = Math.min(html.length, pos + 1000);
      const raw = html.substring(start, end);
      
      // Look for testimonial text / block
      reviews.push({
        query: name,
        pos,
        raw
      });
      pos += name.length + 500;
    }
  }

  // Also search for classes containing 'testimonial'
  const testimonialMatches = html.match(/<div class="[^"]*testimonial[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi) || [];
  console.log('Testimonial regex matches:', testimonialMatches.length);

  fs.writeFileSync('scratch_reviews.json', JSON.stringify(reviews, null, 2));
  console.log('Saved scratch_reviews.json with', reviews.length, 'occurrences');
}

extract().catch(console.error);

