import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const eventIcon = new L.Icon({
    iconUrl: "https://minecraft.wiki/images/thumb/Plains_Small_House_3.png/250px-Plains_Small_House_3.png?327da",
    iconSize: [40, 40], // Bigger icon for better visibility
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
  

// User's Location Marker Icon
const userIcon = new L.Icon({
  iconUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/852e6743-660c-44e2-9854-863fd8cac627/dfm84ze-6f82a5bb-1984-441b-a04f-0e4e5c7b85a0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg1MmU2NzQzLTY2MGMtNDRlMi05ODU0LTg2M2ZkOGNhYzYyN1wvZGZtODR6ZS02ZjgyYTViYi0xOTg0LTQ0MWItYTA0Zi0wZTRlNWM3Yjg1YTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.HHjVquhMl29b-D884IBYP7LDBZB4KgPrVINz6q7l6M4", // Change if needed
  iconSize: [32, 64],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const UserLocationMarker = ({ userPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (userPosition) {
      map.setView(userPosition, 12);
    }
  }, [userPosition, map]);

  return userPosition ? (
    <Marker position={userPosition} icon={userIcon}>
      <Popup>
        <span style={{ color: "#00ff00", fontWeight: "bold" }}>📍 YOU ARE HERE.</span>
      </Popup>
    </Marker>
  ) : null;
};

const MapComponent = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [locationInput, setLocationInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Fix: Ensure events are always visible
  const events = [
    {
      id: 1,
      name: "Minecraft Builders Meetup",
      location: "New York City",
      latitude: 40.7128,
      longitude: -74.0060,
      eventDate: "2025-03-10T18:00:00",
      description: "Join us for an exciting Minecraft Builders Meetup where we discuss creative builds, Redstone, and more!"
    },
    {
      id: 2,
      name: "Pixel Art Convention",
      location: "Los Angeles",
      latitude: 34.0522,
      longitude: -118.2437,
      eventDate: "2025-04-05T14:00:00",
      description: "Come see amazing pixel art designs and meet fellow artists in the community."
    },
    {
      id: 3,
      name: "Hackathon 2025",
      location: "San Francisco",
      latitude: 37.7749,
      longitude: -122.4194,
      eventDate: "2025-03-15T09:00:00",
      description: "Join us for a competitive hackathon where the best minds collaborate to build something amazing!"
    },
    {
      id: 4,
      name: "Hardcoded Event - Always Visible",
      location: "Chicago",
      latitude: 41.8781,
      longitude: -87.6298,
      eventDate: "2025-01-01T12:00:00",
      description: "This is a hardcoded test event to ensure at least one event is always displayed."
    }
  ];

  useEffect(() => {
    setFilteredEvents(events);
  }, []);

  // Handle Geolocation
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPosition([latitude, longitude]);
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  // Handle Manual Location Search
  const handleLocationSearch = async () => {
    if (!locationInput) return alert("Please enter a city or address.");

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${locationInput}`
    );
    const data = await response.json();

    if (data.length > 0) {
      setUserPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
    } else {
      alert("Location not found. Try another address.");
    }
  };

  // Fix: Ensure at least one event is always shown
  const handleDateFilter = () => {
    if (!dateInput) {
      setFilteredEvents(events);
      return;
    }

    const filtered = events.filter((event) => {
      return event.eventDate.startsWith(dateInput);
    });

    setFilteredEvents(filtered.length > 0 ? filtered : [events.find(e => e.id === 4)]);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Search Bar - Location & Date Filters */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2 w-full max-w-3xl p-4 bg-gray-900 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Enter location..."
          className="p-2 border-2 border-gray-400 rounded w-full"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <button onClick={handleLocationSearch} className="minecraft-button">
          🔍 Search Location
        </button>
        
        <input
          type="date"
          className="p-2 border-2 border-gray-400 rounded w-full"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        <button onClick={handleDateFilter} className="minecraft-button">
          📅 Filter by Date
        </button>
        
        <button onClick={handleGeolocation} className="minecraft-button">
          📍 Use My Location
        </button>
      </div>
            {/* Streak Box */}
            <div className="streak-box fixed top-20 right-10 bg-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">My Streak 🔥</h2>
      </div>


      {/* Leaflet Map */}
      <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution='&copy; Stadia Maps, &copy; OpenMapTiles &copy; OpenStreetMap contributors'
        />

        {/* User Location Marker */}
        <UserLocationMarker userPosition={userPosition} />

        {/* Filtered Event Markers */}
        {filteredEvents.map((event) => (
          <Marker key={event.id} position={[event.latitude, event.longitude]} icon={eventIcon}>
            <Popup>
              <h3 className="popup-title">{event.name}</h3>
              <p><b>📍 Location:</b> {event.location}</p>
              <p><b>📅 Date:</b> {new Date(event.eventDate).toLocaleDateString()} 🕒 {new Date(event.eventDate).toLocaleTimeString()}</p>
              <p className="popup-hover-text">Click for more details...</p>

              <div className="popup-description">
                <p>{event.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
