from flask import Flask, render_template, request

app = Flask(__name__)
import json
import sys

with open('urllist.txt') as json_file:
    urllist = json.load(json_file)
    print(urllist)

urllists = json.dumps(urllist)
loaded_urllist = json.loads(urllists)

arrpos = [0]
idcounter = 1
for x in range(len(loaded_urllist["websites"])): 
	if idcounter != loaded_urllist["websites"][x]["id"]: 
		arrpos.append(x)
		idcounter=idcounter+1
		
def refresh():
	with open('urllist.txt') as json_file:
		global urllist
		urllist = json.load(json_file)
		print(urllist)
	global urllists
	global loaded_urllist
	urllists = json.dumps(urllist)
	loaded_urllist = json.loads(urllists)
	global arrpos
	arrpos = [0]
	idcounter = 1
	for x in range(len(loaded_urllist["websites"])): 
		if idcounter != loaded_urllist["websites"][x]["id"]: 
			arrpos.append(x)
			idcounter=idcounter+1
	
def arrayToJson(array):
    list1 = {}
    list1['websites'] = []
    for line in array:
        Id = list(line.keys())[0]
        length = len(line.get(Id))
        time = line.get(Id)[length-1]
        for x in range(0,length-1):
            list1['websites'].append({'id':int(Id), 'url': line.get(Id)[x], 'time' : int(time)})
    with open('urllist.txt', 'w') as outfile:
        json.dump(list1,outfile)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', urllist = urllist)

@app.route("/templateone")
def templateone():
	return render_template('templateone.html', urllist = urllist)
	
@app.route("/templatetwo")
def templatetwo():
	return render_template('templatetwo.html', urllist = urllist)
	
@app.route("/templatethree")
def templatethree():
	return render_template('templatethree.html', urllist = urllist)
	
@app.route("/templatefour")
def templatefour():
	return render_template('templatefour.html', urllist = urllist)
	
@app.route("/admin")
def admin():
	refresh();
	return render_template('admin.html', urllist = loaded_urllist, arrpos=arrpos)
	
@app.route('/recieve', methods=['POST'])
def recieve():
	if request.method == 'POST':
		names = request.get_json() #might have to make names (or array whatever) global so file can be rewritten outside
		print(names, file=sys.stderr)
		arrayToJson(names);
		refresh();
	return '', 200
