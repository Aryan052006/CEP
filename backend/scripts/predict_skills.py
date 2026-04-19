import sys
import json
import time

def main():
    try:
        # Read the JSON inputs passed from Node.js child_process
        input_data = sys.argv[1]
        user_data = json.loads(input_data)
        
        # In a real scenario, you would load your scikit-learn models here
        # import joblib
        # model = joblib.load('random_forest_model.pkl')
        # prediction = model.predict([features])
        
        # Simulate ML processing delay
        # time.sleep(1)

        # Mock Heuristic Output based on the user's choices
        recommendations = []
        
        primary_interest = user_data.get('interest', 'General')
        
        if primary_interest == 'Tailoring & Stitching':
            recommendations.append({
                "title": "Advanced Tailoring",
                "match": "95% Match",
                "duration": "3 Months",
                "icon_color": "bg-purple-100 text-purple-600"
            })
            recommendations.append({
                "title": "Boutique Management",
                "match": "88% Match",
                "duration": "1 Month",
                "icon_color": "bg-pink-100 text-pink-600"
            })
        elif primary_interest == 'Handicrafts':
            recommendations.append({
                "title": "Traditional Handicrafts Export",
                "match": "92% Match",
                "duration": "4 Months",
                "icon_color": "bg-orange-100 text-orange-600"
            })
        elif primary_interest == 'Food Processing':
            recommendations.append({
                "title": "Food Packaging & Licensing",
                "match": "90% Match",
                "duration": "2 Months",
                "icon_color": "bg-green-100 text-green-600"
            })
        else:
            # Default fallback
            recommendations.append({
                "title": "Digital Literacy Basics",
                "match": "99% Match",
                "duration": "1 Month",
                "icon_color": "bg-blue-100 text-blue-600"
            })
            recommendations.append({
                "title": "Financial Planning",
                "match": "85% Match",
                "duration": "2 Weeks",
                "icon_color": "bg-yellow-100 text-yellow-600"
            })
            
        print(json.dumps(recommendations))
        sys.exit(0)

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
