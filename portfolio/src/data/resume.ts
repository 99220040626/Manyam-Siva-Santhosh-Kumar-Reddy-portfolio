export type Project = { title: string; category: string; period: string; summary: string; features: string[]; stack: string[]; arch: string[] };
export const me = {
  name: "Manyam Siva Santhosh Kumar Reddy", short: "Siva Santhosh", title: "Full-Stack & Machine Learning Developer",
  roles: ["Full-Stack Developer", "Java & Spring Boot Engineer", "Machine Learning Builder", "Problem Solver"],
  objective: "B.Tech graduate in Computer Science and an IT professional with expertise in Python, FastAPI, SQL, HTML, CSS, JavaScript, React, MySQL, and Git. Experienced in developing full-stack web applications, building RESTful APIs, integrating databases, and implementing secure, scalable backend services. Strong analytical, debugging, and problem-solving skills with a passion for delivering high-quality software solutions. Seeking a Python Full Stack Developer role where I can contribute to innovative projects while continuously enhancing my technical expertise.",
  email: "sivasanthoshmanyam48@gmail.com", phone: "+91-6281134837", location: "India",
  links: { github: "https://github.com/99220040626", linkedin: "https://linkedin.com/in/manyam-siva-santhosh-kumar-reddy-297a9531b/", portfolio: "https://99220040626.github.io/portfolio/", leetcode: "https://leetcode.com/u/qq0liHCj2l/" },
  stats: [{ label: "CGPA", to: 8.34, dec: 2, suffix: "" }, { label: "Class X", to: 99.3, dec: 1, suffix: "%" }, { label: "Class XII", to: 94.8, dec: 1, suffix: "%" }, { label: "ANN test accuracy", to: 92, dec: 0, suffix: "%" }],
  skills: [
    { group: "Languages", items: ["Java", "Python", "SQL"] },
    { group: "Web & Backend", items: ["HTML5", "CSS3", "Spring Boot", "RESTful APIs", "MySQL"] },
    { group: "ML & Data", items: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy"] },
    { group: "Tools", items: ["Git", "GitHub", "VS Code"] },
    { group: "Core subjects", items: ["Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks"] },
    { group: "Soft skills", items: ["Critical thinking", "Data-driven decisions", "Project ownership", "Team work"] },
  ],
  languages: ["English", "Telugu", "Tamil"], interests: ["Artificial Intelligence", "Learning new technologies"],
};
export const projects: Project[] = [
  { title: "E-Commerce Web Application", category: "Full-Stack", period: "Jan 2024 – Mar 2024",
    summary: "A full-stack store with a Spring Boot backend covering authentication, products, cart and orders, backed by MySQL.",
    features: ["REST APIs for authentication, product management, cart operations and order processing", "Controller-Service-Repository architecture for modular business logic", "MySQL persistence through Spring Data JPA / Hibernate"],
    stack: ["React", "Java", "Spring Boot", "REST APIs", "MySQL", "JPA/Hibernate"], arch: ["React UI", "REST Controllers", "Service Layer", "JPA Repository", "MySQL"] },
  { title: "Thyroid Disease Detection System", category: "Machine Learning", period: "Jan 2025 – Mar 2025",
    summary: "An Artificial Neural Network that classifies thyroid disease and reaches 92% accuracy on the test dataset.",
    features: ["Data preprocessing, normalization and feature engineering", "SMOTE to handle class imbalance", "Dropout and regularization to prevent overfitting"],
    stack: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "NumPy"], arch: ["Raw data", "Preprocess + normalize", "SMOTE balancing", "ANN with dropout", "92% accuracy"] },
];
export const education = [
  { school: "Kalasalingam Academy of Research and Education", degree: "Bachelor of Engineering, Computer Engineering", period: "Sept 2022 – April 2026", score: "CGPA 8.34" },
  { school: "Gowtham Junior College", degree: "Senior Secondary (Class XII)", period: "Sept 2020 – April 2022", score: "94.8%" },
  { school: "Montessori English Medium High School", degree: "Secondary (Class X)", period: "Sept 2019 – April 2020", score: "99.3%" },
];
export type Cert = { title: string; issuer: string; year: string; links: { label: string; href: string }[] };
const drive = (id: string) => `https://drive.google.com/file/d/${id}/view?usp=drivesdk`;
const view = (id: string) => [{ label: "View certificate", href: drive(id) }];
export const certs: Cert[] = [
  { title: "Hackathon", issuer: "Secured 2nd Place", year: "", links: [{ label: "View certificate", href: drive("1PG50ivrfZMxqQebGqtv1FgoJS3o5jVtr") }] },
  { title: "Java", issuer: "CodeChef", year: "2025", links: view("1JxL_T0ZXGfFXDD5TthyiGu7vNbx7ctQ7") },
  { title: "Python", issuer: "CodeChef", year: "2025", links: view("1K4tl4oO-Vi0Og7QrTmTh4xucIt4XDAZ8") },
  { title: "HTML & CSS", issuer: "CodeChef", year: "2025", links: view("1K-oN7gRofqb2lBwzM_z7MEDhwMxM6Z7v") },
  { title: "SQL", issuer: "CodeChef", year: "2025", links: view("1JveZ6fOBC-DPnOydJ9KmPtJgVU5mHW2q") },
  { title: "DBMS", issuer: "CodeChef", year: "2025", links: view("1UP9CHcV4-Q7NMI047ATzwAH5PV34Q8YF") },
];
