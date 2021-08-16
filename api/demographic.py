import pandas as pd
import numpy as np

df2 = pd.read_csv('final.csv')
m = df2['vote_count'].quantile(0.9)
c = df2['vote_average'].mean()
movies = df2.copy().loc[df2['vote_count']>=m]

def wr(x,m=m,c=c):
  v = x['vote_count']
  r = x['vote_average']
  return (v/(v+m)*r)+(m/(v+m)*c)

movies['score']=movies.apply(wr,axis=1)
movies = movies.sort_values('score',ascending=False)
output = movies[['original_title','overview','vote_average','score','poster_link','runtime']].head(20).values.tolist()