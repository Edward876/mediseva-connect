
// Data structure for Indian states and their cities
export const indianStates = [
  {
    name: "All States",
    cities: ["All Cities"]
  },
  {
    name: "Maharashtra",
    cities: [
      "All Cities", 
      "Mumbai", 
      "Pune", 
      "Nagpur", 
      "Thane", 
      "Nashik", 
      "Aurangabad", 
      "Solapur"
    ]
  },
  {
    name: "Delhi",
    cities: [
      "All Cities", 
      "New Delhi", 
      "North Delhi", 
      "South Delhi", 
      "East Delhi", 
      "West Delhi"
    ]
  },
  {
    name: "Karnataka",
    cities: [
      "All Cities", 
      "Bangalore", 
      "Mysore", 
      "Hubli", 
      "Mangalore", 
      "Belgaum", 
      "Gulbarga"
    ]
  },
  {
    name: "Tamil Nadu",
    cities: [
      "All Cities", 
      "Chennai", 
      "Coimbatore", 
      "Madurai", 
      "Tiruchirappalli", 
      "Salem", 
      "Tirunelveli"
    ]
  },
  {
    name: "Gujarat",
    cities: [
      "All Cities", 
      "Ahmedabad", 
      "Surat", 
      "Vadodara", 
      "Rajkot", 
      "Bhavnagar", 
      "Jamnagar"
    ]
  },
  {
    name: "Uttar Pradesh",
    cities: [
      "All Cities", 
      "Lucknow", 
      "Kanpur", 
      "Agra", 
      "Varanasi", 
      "Meerut", 
      "Allahabad", 
      "Ghaziabad"
    ]
  },
  {
    name: "West Bengal",
    cities: [
      "All Cities", 
      "Kolkata", 
      "Howrah", 
      "Durgapur", 
      "Asansol", 
      "Siliguri", 
      "Bardhaman"
    ]
  },
  {
    name: "Rajasthan",
    cities: [
      "All Cities", 
      "Jaipur", 
      "Jodhpur", 
      "Udaipur", 
      "Kota", 
      "Bikaner", 
      "Ajmer"
    ]
  },
  {
    name: "Telangana",
    cities: [
      "All Cities", 
      "Hyderabad", 
      "Warangal", 
      "Nizamabad", 
      "Karimnagar", 
      "Khammam"
    ]
  },
  {
    name: "Kerala",
    cities: [
      "All Cities", 
      "Thiruvananthapuram", 
      "Kochi", 
      "Kozhikode", 
      "Thrissur", 
      "Kollam"
    ]
  },
  {
    name: "Punjab",
    cities: [
      "All Cities", 
      "Ludhiana", 
      "Amritsar", 
      "Jalandhar", 
      "Patiala", 
      "Bathinda"
    ]
  },
  {
    name: "Haryana",
    cities: [
      "All Cities", 
      "Faridabad", 
      "Gurgaon", 
      "Panipat", 
      "Ambala", 
      "Rohtak"
    ]
  },
  {
    name: "Bihar",
    cities: [
      "All Cities", 
      "Patna", 
      "Gaya", 
      "Bhagalpur", 
      "Muzaffarpur", 
      "Darbhanga"
    ]
  }
];

// Function to get cities for a selected state
export const getCitiesForState = (state: string): string[] => {
  const selectedState = indianStates.find(s => s.name === state);
  return selectedState ? selectedState.cities : ["All Cities"];
};
