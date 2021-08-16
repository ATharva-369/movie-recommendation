from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
import numpy as np

df2 = pd.read_csv('final.csv')
df2 = df2[df2['soup'].notna()]

count = CountVectorizer(stop_words = "english")
count_matrix = count.fit_transform(df2['soup'])

c = cosine_similarity(count_matrix,count_matrix)

df2 = df2.reset_index()
i = pd.Series(df2.index,index=df2['original_title'])

def recommended(title,cos):
  idx = i[title]
  scores = list(enumerate(cos[idx]))
  scores = sorted(scores,key=lambda x : x[1] ,reverse=True)
  scores = scores[1:11]
  movies = [i[0] for i in scores]
  return df2[['original_title','overview','vote_average','score','poster_link','runtime']].iloc[movies].values.tolist()