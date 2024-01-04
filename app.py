from flask import Flask, request, jsonify, render_template

from inference import generate_response, load_model
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/talk', methods=['POST'])
def talk():
    data = request.json
    message = data['message']
    model, tokenizer= load_model('./sentiment_trained_model')
    # Replace the placeholder in the /talk route with:
    response = generate_response(message, model, tokenizer)
    # Print the message to the console
    print("BOT said:", response)
    
    # TODO: Process the message through your GPT-2 model
    response = response  # Replace this with actual model response

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host= '0.0.0.0', port= 5000, debug=True)
