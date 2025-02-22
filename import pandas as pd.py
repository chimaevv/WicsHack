import pandas as pd
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
from sklearn.cluster import KMeans
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.decomposition import PCA

# coding on google colab before
from google.colab import files
uploaded = files.upload()

# a random sample dataset from gov - Arlington history event data
file_path = 'EventSample.json'

with open(file_path, 'r') as file:
    data = json.load(file)

# Rename columns we need
events_data = [
    {
        'name': event.get('eventName'),
        'description': event.get('eventDsc'),
        'date': event.get('eventStartDate'),
        'time': event.get('eventStartTime'),
        'location': event.get('eventCreationUserId')
    }
    for event in data
]

# turns data into pandas DataFrame
df = pd.DataFrame(events_data)
df = df.dropna(subset=['description'])

# Extract eventDsc field as text
texts = df['description'].tolist()

# Converting text to TF-IDF numerical representation
vectorizer = TfidfVectorizer(stop_words='english')
vectorized_documents = vectorizer.fit_transform(texts)

# Dimensionality reduction using PCA
pca = PCA(n_components=2)
reduced_data = pca.fit_transform(vectorized_documents.toarray())

# Apply K-means clustering
num_clusters = 5  # num of categories needed
kmeans = KMeans(n_clusters=num_clusters, n_init=5, max_iter=500, random_state=42)
kmeans.fit(vectorized_documents)

# Save the Clustering reulsts into DataFrame
df['predicted_cluster'] = kmeans.labels_

print(df[['name', 'description', 'predicted_cluster']].head())

# Take a look of head results of each cluster
for i in range(5):  
    print(f"Cluster {i}:")
    print(df[df['predicted_cluster'] == i][['name', 'description']].head()) 
    print("\n")

# See size of each cluster
print(df.groupby('predicted_cluster').size())

# Naming my cluster
cluster_names = {
    0: 'Entertainment & Performances',  
    1: 'Community Services & Assistance',
    2: 'Children & Family Activities',
    3: 'Voting & Public Affairs',
    4: 'Environmental & Community Volunteering'
}

# Create a new column for cluster name
df['cluster_name'] = df['predicted_cluster'].map(cluster_names)

print(df[['name', 'description', 'predicted_cluster', 'cluster_name']].head())