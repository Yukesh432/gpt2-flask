from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Load model and tokenizer
model = GPT2LMHeadModel.from_pretrained('C:/Users/AIXI/OneDrive/Desktop/projects/transformer-model/gpt2/podcast_trained_model')
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

def generate_response(message):
    inputs = tokenizer.encode(message, return_tensors='pt')
    outputs = model.generate(inputs, max_length=50, num_return_sequences=1)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response


