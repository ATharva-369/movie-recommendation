import pandas as pd
from storage import movies,liked,disliked,unwatched
from demographic import output 
from content import recommended
from flask import Flask,jsonify,request
from flask_ngrok import run_with_ngrok

app = Flask(__name__)

run_with_ngrok(app)

@app.route('/movies')
def get_movies():
  mdata = {
      'original_title':movies[0][19],
      'overview':movies[0][9],
      'poster_link':movies[0][27],
      'runtime': movies[0][15],
      'rating' : movies[0][20]
  }  
  return jsonify({
      'data'   : mdata,
      'status' : 'success'
  })

@app.route('/liked',methods=['POST'])
def get_liked_movies():
  movie = movies[0]
  liked.append(movie)
  movies.pop(0)
  return jsonify({
      'status' : 'success'
  })

@app.route('/disliked',methods=['POST'])
def get_disliked_movies():
  movie = movies[0]
  disliked.append(movie)
  movies.pop(0)
  return jsonify({
      'status' : 'success'
  })

@app.route('/unwatched',methods=['POST'])
def get_unwatched_movies():
  movie = movies[0]
  unwatched.append(movie)
  movies.pop(0)
  return jsonify({
      'status' : 'success'
  })  

@app.route('/popular')
def popular():
    mdata = []
    for i in output :
        d = {
      'original_title':movies[0],
      'overview':movies[1],
      'poster_link':movies[4],
      'runtime': movies[5],
      'rating' : movies[2]
        }
    mdata.append(d)
    return jsonify({
        'data' : mdata,
        'status' : 'success!'
    })

@app.route('/recommended')
def recommendation():
    mdata = []
    for i in liked:
        o = recommended(i[19]) #/
        for data in o:
            mdata.append(data)    
    import itertools   
    mdata.sort()
    mdata = list(r for r in itertools.groupby(r)) #/
    movie_data = []

    for i in mdata:
      d = {
        'original_title':movies[0],
        'overview':movies[1],
        'poster_link':movies[4],
        'runtime': movies[5],
        'rating' : movies[2]
      }
      movie_data.append(d)

    return jsonify({
        'data': movie_data,
        'status' : 'success!'
    } )

if __name__ == '__main__':
  app.run()

#'original_title','overview','vote_average','score','poster_link','runtime'  