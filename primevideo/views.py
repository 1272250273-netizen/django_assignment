from django.shortcuts import render

TITLES = [
    {'id': 'last-signal', 'title': 'The Last Signal', 'type': 'Series', 'year': '2026', 'genre': 'Sci-fi', 'image': 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=700&q=85', 'description': "When the world's satellites go silent, one engineer has 72 hours to find the voice hidden in the static."},
    {'id': 'fallout', 'title': 'Fallout', 'type': 'Series', 'year': '2024', 'genre': 'Drama', 'image': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=85', 'description': 'A survivor leaves the safety of her underground home to discover a strange and dangerous world above.'},
    {'id': 'citadel', 'title': 'Citadel', 'type': 'Series', 'year': '2023', 'genre': 'Thriller', 'image': 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=700&q=85', 'description': 'An elite global spy agency has fallen. Two agents must rebuild it from the ashes.'},
    {'id': 'rings', 'title': 'The Rings of Power', 'type': 'Series', 'year': '2024', 'genre': 'Fantasy', 'image': 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=85', 'description': 'Heroes and villains face the long-feared re-emergence of evil in Middle-earth.'},
    {'id': 'reacher', 'title': 'Reacher', 'type': 'Series', 'year': '2025', 'genre': 'Action', 'image': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=700&q=85', 'description': 'Jack Reacher returns to the world of danger, justice and unfinished business.'},
    {'id': 'expanse', 'title': 'The Expanse', 'type': 'Series', 'year': '2021', 'genre': 'Sci-fi', 'image': 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=700&q=85', 'description': 'Humanity has colonized the solar system, but a conspiracy threatens to ignite a war.'},
    {'id': 'air', 'title': 'Air', 'type': 'Movie', 'year': '2023', 'genre': 'Drama', 'image': 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=700&q=85', 'description': 'The unbelievable partnership behind the iconic Air Jordan brand.'},
    {'id': 'tomorrow', 'title': 'The Tomorrow War', 'type': 'Movie', 'year': '2021', 'genre': 'Action', 'image': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=85', 'description': 'The future of humanity rests on one soldier who is drafted to fight a war from the past.'},
    {'id': 'boys', 'title': 'The Boys', 'type': 'Series', 'year': '2024', 'genre': 'Action', 'image': 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=85', 'description': 'A group of vigilantes set out to take down corrupt superheroes who abuse their powers.'},
    {'id': 'luca', 'title': 'Luca', 'type': 'Movie', 'year': '2021', 'genre': 'Family', 'image': 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=700&q=85', 'description': 'A seaside summer becomes an unforgettable adventure for two friends with a secret.'},
]

def home(request):
    return render(request, 'primevideo/home.html', {'titles': TITLES, 'popular': TITLES[1:7], 'action': [TITLES[4], TITLES[7], TITLES[8], TITLES[2], TITLES[6]], 'wide': [TITLES[9], TITLES[6], TITLES[0]]})
