import logo from './logo.svg'
import profile_icon from './profile.png'
import pothole_img from './pothole.png' 
import garbage_img from './garbage.png'
import water_leak_img from './water_leak.png'
import streetlight_img from './streetlight.png'
import background from './background.png'

export const assets = {
    logo,
    profile_icon,
    pothole_img,
    garbage_img,
    background,
    water_leak_img,
    streetlight_img
}

export const dummyIssuesData = [
    {
        "_id": "6835a1",
        "title": "Severe Potholes on Main Road",
        "landmark": "Near DY Patil College, Salokhenagar",
        "description": "Multiple large potholes are causing damage to vehicles and creating a safety hazard for two-wheelers.",
        "image": assets.pothole_img,
        "status": "Pending",
        "reportedBy": "Sujal",
        "date": "2026-03-24"
    },
    {
        "_id": "6835a2",
        "title": "Overflowing Garbage Bin",
        "landmark": "Rajaram Puri, 5th Lane",
        "description": "The community bin has not been cleared for three days, causing a foul smell in the area.",
        "image": assets.garbage_img,
        "status": "In Progress",
        "reportedBy": "Atharv",
        "date": "2026-03-25"
    },
    {
        "_id": "6835a3",
        "title": "Broken Street Light",
        "landmark": "Cyber Chowk backroad",
        "description": "Street light number #45 is flickering and turning off, making the road dark at night.",
        "image": assets.streetlight_img,
        "status": "Resolved",
        "reportedBy": "Megha",
        "date": "2026-03-20"
    },
    {
        "_id": "6835a4",
        "title": "Major Pipe Leakage",
        "landmark": "Market Yard Entrance",
        "description": "A drinking water pipeline has burst, wasting thousands of liters of water.",
        "image": assets.water_leak_img,
        "status": "Pending",
        "reportedBy": "Sujal",
        "date": "2026-03-25"
    }
]