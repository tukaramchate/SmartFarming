




from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os
import tensorflow as tf
import numpy as np

app = Flask(__name__)
model = tf.keras.models.load_model('potato_disease_model.h5', compile=False)

# model = tf.keras.models.load_model('potato_disease_model.h5')
class_names = ['Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy']
IMAGE_SIZE = 255
def clear_static_folder():
    for filename in os.listdir('static'):
        file_path = os.path.join('static', filename)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")

def predict(img):
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    predictions = model.predict(img_array)
    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = round(100 * np.max(predictions[0]), 2)
    return predicted_class, confidence

@app.route('/', methods=['GET', 'POST'])
def home():
     
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            clear_static_folder()
            filepath = os.path.join('static', filename)
            file.save(filepath)
            img = tf.keras.preprocessing.image.load_img(filepath, target_size=(IMAGE_SIZE, IMAGE_SIZE))
            predicted_class, confidence = predict(img)
            return render_template('index.html', image_path=filepath, predicted_label=predicted_class, confidence=confidence)
    return render_template('index.html', message='Upload an image')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg'}

if __name__ == '__main__':
    app.run(debug=True)