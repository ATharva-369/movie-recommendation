import pandas as pd
import csv

movies = []

with open('final.csv') as f:
    r = csv.reader(f)
    data = list(r)
    movies = data[1:]

liked = []
disliked = []
unwatched = []