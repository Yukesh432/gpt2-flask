from flask import Flask, request, jsonify
from inference import generate_response
app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/talk', methods=['POST'])
def talk():
    data = request.json
    message = data['message']
    # Replace the placeholder in the /talk route with:
    response = generate_response(message)
    # Print the message to the console
    print("BOT said:", response)
    
    # TODO: Process the message through your GPT-2 model
    response = response  # Replace this with actual model response

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
