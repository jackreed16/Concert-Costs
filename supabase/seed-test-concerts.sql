-- Test data for Concert Cost Tracker (run in SQL Editor).
-- Replace USER_ID with your auth user id from: select id, email from auth.users;

-- Example user: jjreed@go.olemiss.edu
-- USER_ID: 23c3adbc-00c1-43ae-ae13-5fc50be93d19

insert into public.concerts (
  user_id, concert_name, artist, venue, city, state, concert_date,
  distance_from_home, hours_at_event,
  ticket_cost, ticket_fees, parking_cost, food_drink_cost, merchandise_cost, lodging_cost, travel_cost, other_cost,
  fun_rating, notes
) values
('23c3adbc-00c1-43ae-ae13-5fc50be93d19', 'Eras Tour Night 1', 'Taylor Swift', 'Caesars Superdome', 'New Orleans', 'LA', '2024-10-12', 320, 4.5, 189, 28.5, 25, 45, 35, 0, 85, 12, 10, 'Amazing production. Worth every penny.'),
('23c3adbc-00c1-43ae-ae13-5fc50be93d19', 'Summer Stadium Show', 'Luke Combs', 'Nissan Stadium', 'Nashville', 'TN', '2024-07-04', 210, 3.5, 95, 15, 20, 30, 22, 0, 48, 0, 8, 'Fourth of July show with friends.'),
('23c3adbc-00c1-43ae-ae13-5fc50be93d19', 'Indie Night', 'The National', 'Red Rocks Amphitheatre', 'Morrison', 'CO', '2025-03-15', 980, 5, 75, 12, 0, 28, 15, 120, 210, 18, 9, 'Stayed overnight in Denver. Red Rocks was incredible.'),
('23c3adbc-00c1-43ae-ae13-5fc50be93d19', 'Arena Pop Night', 'Dua Lipa', 'State Farm Arena', 'Atlanta', 'GA', '2025-01-20', 380, 3, 110, 18, 30, 22, 40, 0, 72, 5, 7, null),
('23c3adbc-00c1-43ae-ae13-5fc50be93d19', 'Hometown Fest', 'Various Artists', 'Liberty Park', 'Birmingham', 'AL', '2024-05-18', 45, 6, 65, 8, 15, 55, 0, 0, 12, 0, 6, 'Local festival — mixed lineup.'),
('23c3adbc-00c1-43ae-ae13-5fc50be93d19', 'Jazz in the Quarter', 'Preservation Hall Band', 'Preservation Hall', 'New Orleans', 'LA', '2025-02-08', 320, 2.5, 45, 5, 0, 35, 0, 0, 25, 0, 9, 'Intimate venue, great vibe.'),
('23c3adbc-00c1-43ae-ae13-5fc50be93d19', 'Rock Revival Tour', 'Foo Fighters', 'United Center', 'Chicago', 'IL', '2024-11-02', 520, 4, 125, 20, 35, 38, 28, 95, 140, 8, 8, 'Hotel in Chicago for the weekend.'),
('23c3adbc-00c1-43ae-ae13-5fc50be93d19', 'College Reunion Show', 'Widespread Panic', 'Orpheum Theater', 'New Orleans', 'LA', '2024-09-14', 5, 3.5, 55, 8, 10, 42, 18, 0, 8, 0, 10, 'Short drive — best value night of the year!');
