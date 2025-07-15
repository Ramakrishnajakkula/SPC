import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./HackathonRegister.css";
import Loading from "./Loading";
import { getHackathonUrl } from "../config/api";
import API_CONFIG from "../config/api";

const HackathonRegister = () => {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Information
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",

    // Professional/Academic Info
    organizationName: "",
    currentRole: "",
    resume: "",
    linkedinProfile: "",

    // Hackathon-Specific Info
    skillSet: [],
    techStack: [],
    portfolio: "",
    githubProfile: "",
    personalWebsite: "",
    tshirtSize: "",

    // Team Details
    participationType: "solo", // solo or team
    teamName: "",
    teamMembers: [],

    // Optional
    motivation: "",
    previousExperience: "",
    projectIdeas: "",

    // Legal
    agreeToTerms: false,
    agreeToPhotos: false,
    agreeToCodeOfConduct: false,
  });

  const skillOptions = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Mobile Development",
    "UI/UX Design",
    "Data Science",
    "Machine Learning",
    "AI Development",
    "DevOps",
    "Cybersecurity",
    "Blockchain",
    "Game Development",
    "Product Management",
    "Business Analysis",
    "Marketing",
    "Content Creation",
  ];

  const techStackOptions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Python",
    "Django",
    "Flask",
    "Java",
    "Spring Boot",
    "C++",
    "C#",
    ".NET",
    "PHP",
    "Laravel",
    "Ruby",
    "Ruby on Rails",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "Flutter",
    "React Native",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
  ];

  const fetchHackathon = useCallback(async () => {
    try {
      const response = await axios.get(
        getHackathonUrl(API_CONFIG.ENDPOINTS.HACKATHONS.BY_ID(hackathonId))
      );
      setHackathon(response.data);

      // Pre-fill user info if available
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      if (userInfo.email) {
        setFormData((prev) => ({
          ...prev,
          email: userInfo.email,
          fullName: userInfo.username || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching hackathon:", error);
      navigate("/hackathon");
    } finally {
      setLoading(false);
    }
  }, [hackathonId, navigate]);

  useEffect(() => {
    fetchHackathon();
  }, [fetchHackathon]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));
  };

  const addTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "", email: "", role: "" }],
    }));
  };

  const removeTeamMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }));
  };

  const updateTeamMember = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms || !formData.agreeToCodeOfConduct) {
      alert("Please agree to the terms and conditions and code of conduct.");
      return;
    }

    if (
      formData.participationType === "team" &&
      (!formData.teamName || formData.teamMembers.length === 0)
    ) {
      alert(
        "Please provide team name and at least one team member for team participation."
      );
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        getHackathonUrl(API_CONFIG.ENDPOINTS.HACKATHONS.REGISTER(hackathonId)),
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert(
        "Registration successful! You will receive a confirmation email shortly."
      );
      navigate("/hackathon");
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading message="Loading hackathon details..." />;
  }

  if (!hackathon) {
    return (
      <div className="error-state">
        <h2>Hackathon not found</h2>
        <button
          onClick={() => navigate("/hackathon")}
          className="btn btn-primary">
          Back to Hackathons
        </button>
      </div>
    );
  }

  return (
    <div className="hackathon-register-page">
      <div className="register-header">
        <div className="register-hero">
          <h1>Register for {hackathon.title}</h1>
          <p>{hackathon.shortDescription}</p>
          <div className="hackathon-info">
            <span className="info-item">
              <strong>Theme:</strong> {hackathon.theme}
            </span>
            <span className="info-item">
              <strong>Dates:</strong>{" "}
              {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
              {new Date(hackathon.endDate).toLocaleDateString()}
            </span>
            <span className="info-item">
              <strong>Team Size:</strong> {hackathon.teamSizeMin}-
              {hackathon.teamSizeMax} members
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        {/* Basic Information */}
        <div className="form-section">
          <h2 className="section-title">Basic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        {/* Professional/Academic Info */}
        <div className="form-section">
          <h2 className="section-title">Professional/Academic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="organizationName">
                Organization/College Name *
              </label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="currentRole">Current Role *</label>
              <input
                type="text"
                id="currentRole"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleInputChange}
                placeholder="e.g., Student, Developer, Designer"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="resume">Resume/CV Link</label>
              <input
                type="url"
                id="resume"
                name="resume"
                value={formData.resume}
                onChange={handleInputChange}
                placeholder="https://drive.google.com/..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="linkedinProfile">LinkedIn Profile</label>
              <input
                type="url"
                id="linkedinProfile"
                name="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>
        </div>

        {/* Hackathon-Specific Info */}
        <div className="form-section">
          <h2 className="section-title">Hackathon-Specific Information</h2>

          <div className="form-group">
            <label>Skill Set / Areas of Expertise *</label>
            <div className="checkbox-grid">
              {skillOptions.map((skill) => (
                <label key={skill} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.skillSet.includes(skill)}
                    onChange={() => handleMultiSelect("skillSet", skill)}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Tech Stack</label>
            <div className="checkbox-grid">
              {techStackOptions.map((tech) => (
                <label key={tech} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.techStack.includes(tech)}
                    onChange={() => handleMultiSelect("techStack", tech)}
                  />
                  <span>{tech}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="portfolio">Portfolio</label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                placeholder="https://yourportfolio.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="githubProfile">GitHub Profile</label>
              <input
                type="url"
                id="githubProfile"
                name="githubProfile"
                value={formData.githubProfile}
                onChange={handleInputChange}
                placeholder="https://github.com/yourusername"
              />
            </div>

            <div className="form-group">
              <label htmlFor="personalWebsite">Personal Website</label>
              <input
                type="url"
                id="personalWebsite"
                name="personalWebsite"
                value={formData.personalWebsite}
                onChange={handleInputChange}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tshirtSize">T-Shirt Size</label>
              <select
                id="tshirtSize"
                name="tshirtSize"
                value={formData.tshirtSize}
                onChange={handleInputChange}>
                <option value="">Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
        </div>

        {/* Team Details */}
        <div className="form-section">
          <h2 className="section-title">Team Details</h2>

          <div className="form-group">
            <label>Participation Type *</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="participationType"
                  value="solo"
                  checked={formData.participationType === "solo"}
                  onChange={handleInputChange}
                />
                <span>Solo Participation</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="participationType"
                  value="team"
                  checked={formData.participationType === "team"}
                  onChange={handleInputChange}
                />
                <span>Team Participation</span>
              </label>
            </div>
          </div>

          {formData.participationType === "team" && (
            <>
              <div className="form-group">
                <label htmlFor="teamName">Team Name *</label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  required={formData.participationType === "team"}
                />
              </div>

              <div className="form-group">
                <label>Team Members</label>
                <div className="team-members-section">
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="team-member-row">
                      <input
                        type="text"
                        placeholder="Member Name"
                        value={member.name}
                        onChange={(e) =>
                          updateTeamMember(index, "name", e.target.value)
                        }
                      />
                      <input
                        type="email"
                        placeholder="Member Email"
                        value={member.email}
                        onChange={(e) =>
                          updateTeamMember(index, "email", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={member.role}
                        onChange={(e) =>
                          updateTeamMember(index, "role", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="btn-remove">
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTeamMember}
                    className="btn btn-secondary">
                    Add Team Member
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Optional Information */}
        <div className="form-section">
          <h2 className="section-title">Optional Information</h2>
          <div className="form-group">
            <label htmlFor="motivation">Why do you want to participate?</label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              rows="4"
              placeholder="Tell us what motivates you to join this hackathon..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="previousExperience">
              Previous Hackathon Experience
            </label>
            <textarea
              id="previousExperience"
              name="previousExperience"
              value={formData.previousExperience}
              onChange={handleInputChange}
              rows="3"
              placeholder="Describe your previous hackathon experiences..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectIdeas">
              Any project ideas you&apos;re planning to build?
            </label>
            <textarea
              id="projectIdeas"
              name="projectIdeas"
              value={formData.projectIdeas}
              onChange={handleInputChange}
              rows="4"
              placeholder="Share your initial project ideas or concepts..."
            />
          </div>
        </div>

        {/* Legal and Compliance */}
        <div className="form-section">
          <h2 className="section-title">Legal and Compliance</h2>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
              />
              <span>I agree to the Terms & Conditions *</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToPhotos"
                checked={formData.agreeToPhotos}
                onChange={handleInputChange}
              />
              <span>
                I consent to photos/videos being taken during the event
              </span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToCodeOfConduct"
                checked={formData.agreeToCodeOfConduct}
                onChange={handleInputChange}
                required
              />
              <span>I accept the Code of Conduct *</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/hackathon")}
            className="btn btn-secondary">
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary">
            {submitting ? "Registering..." : "Register for Hackathon"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HackathonRegister;
