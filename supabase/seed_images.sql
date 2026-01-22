-- Update mock posts with Unsplash images
UPDATE posts 
SET cover_image = 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=2000'
WHERE slug = 'the-art-of-minimalism';

UPDATE posts 
SET cover_image = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000'
WHERE slug = 'morning-coffee-routines';

UPDATE posts 
SET cover_image = 'https://images.unsplash.com/photo-1516541196185-399315c6837a?auto=format&fit=crop&q=80&w=2000'
WHERE slug = 'a-letter-to-my-future-self';
