import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./HackathonRegister.css"; // Reuse the same styles
import Loading from "./Loading";
import { getHackathonUrl } from "../config/api";
import API_CONFIG from "../config/api";

const HackathonRegistrationEdit = () => {
  const { registrationId } = useParams();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(null);
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
    organizationName: "",
    currentRole: "",

    // Professional Information
    resume: "",
    linkedinProfile: "",
    skillSet: [],
    techStack: [],
    portfolio: "",
    githubProfile: "",
    personalWebsite: "",

    // Event Information
    tshirtSize: "",
    participationType: "",
    teamName: "",
    teamMembers: [],

    // Motivation and Experience
    motivation: "",
    previousExperience: "",
    projectIdeas: "",

    // Agreements
    agreeToTerms: false,
    agreeToPhotos: false,
    agreeToCodeOfConduct: false,
  });

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          getHackathonUrl(
            API_CONFIG.ENDPOINTS.REGISTRATIONS.BY_ID(registrationId)
          ),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const registrationData = response.data;
        setRegistration(registrationData);
        setHackathon(registrationData.hackathon);

        // Populate form with existing data
        setFormData({
          fullName: registrationData.fullName || "",
          email: registrationData.email || "",
          phoneNumber: registrationData.phoneNumber || "",
          dateOfBirth: registrationData.dateOfBirth
            ? registrationData.dateOfBirth.split("T")[0]
            : "",
          gender: registrationData.gender || "",
          organizationName: registrationData.organizationName || "",
          currentRole: registrationData.currentRole || "",
          resume: registrationData.resume || "",
          linkedinProfile: registrationData.linkedinProfile || "",
          skillSet: registrationData.skillSet || [],
          techStack: registrationData.techStack || [],
          portfolio: registrationData.portfolio || "",
          githubProfile: registrationData.githubProfile || "",
          personalWebsite: registrationData.personalWebsite || "",
          tshirtSize: registrationData.tshirtSize || "",
          participationType: registrationData.participationType || "",
          teamName: registrationData.teamName || "",
          teamMembers: registrationData.teamMembers || [],
          motivation: registrationData.motivation || "",
          previousExperience: registrationData.previousExperience || "",
          projectIdeas: registrationData.projectIdeas || "",
          agreeToTerms: registrationData.agreeToTerms || false,
          agreeToPhotos: registrationData.agreeToPhotos || false,
          agreeToCodeOfConduct: registrationData.agreeToCodeOfConduct || false,
        });
      } catch (error) {
        console.error("Error fetching registration:", error);
        alert("Failed to load registration details");
        navigate("/hackathon");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationData();
  }, [registrationId, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSkillChange = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skillSet: prev.skillSet.includes(skill)
        ? prev.skillSet.filter((s) => s !== skill)
        : [...prev.skillSet, skill],
    }));
  };

  const handleTechStackChange = (tech) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter((t) => t !== tech)
        : [...prev.techStack, tech],
    }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData((prev) => ({ ...prev, teamMembers: updatedMembers }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms || !formData.agreeToCodeOfConduct) {
      alert("Please agree to the terms and code of conduct");
      return;
    }

    try {
      setSubmitting(true);

      await axios.put(
        getHackathonUrl(
          API_CONFIG.ENDPOINTS.REGISTRATIONS.BY_ID(registrationId)
        ),
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert("Registration updated successfully!");
      navigate("/hackathon", { state: { activeTab: "registered" } });
    } catch (error) {
      console.error("Error updating registration:", error);
      alert(error.response?.data?.message || "Failed to update registration");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/hackathon", { state: { activeTab: "registered" } });
  };

  if (loading) {
    return <Loading message="Loading registration details..." />;
  }

  if (!registration || !hackathon) {
    return (
      <div className="register-page">
        <div className="error-state">
          <h2>Registration Not Found</h2>
          <p>
            The registration could not be found or you don&apos;t have
            permission to edit it.
          </p>
          <button
            onClick={() => navigate("/hackathon")}
            className="btn btn-primary">
            Back to Hackathons
          </button>
        </div>
      </div>
    );
  }

  const availableSkills = [
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "Mobile Development",
    "UI/UX Design",
    "Data Science",
    "Machine Learning",
    "DevOps",
    "Blockchain",
    "Cybersecurity",
    "Game Development",
    "Other",
  ];

  const availableTechStack = [
    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Express",
    "Python",
    "Django",
    "Flask",
    "Java",
    "Spring",
    "C++",
    "C#",
    ".NET",
    "PHP",
    "Ruby",
    "Go",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Firebase",
    "AWS",
    "Azure",
    "Docker",
    "Other",
  ];

  const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Edit Registration</h1>
          <h2>{hackathon.title}</h2>
          <p>Update your registration details below</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
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
                <label htmlFor="email">Email *</label>
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
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="form-section">
            <h3>Professional Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="organizationName">
                  Organization/University
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="currentRole">Current Role/Position</label>
                <input
                  type="text"
                  id="currentRole"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="form-section">
            <h3>Skills & Technology</h3>
            <div className="form-group">
              <label>Skill Set</label>
              <div className="checkbox-grid">
                {availableSkills.map((skill) => (
                  <label key={skill} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.skillSet.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Technology Stack</label>
              <div className="checkbox-grid">
                {availableTechStack.map((tech) => (
                  <label key={tech} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.techStack.includes(tech)}
                      onChange={() => handleTechStackChange(tech)}
                    />
                    {tech}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Team Information */}
          <div className="form-section">
            <h3>Participation Type</h3>
            <div className="form-group">
              <label>Participation Type</label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="participationType"
                    value="solo"
                    checked={formData.participationType === "solo"}
                    onChange={handleInputChange}
                  />
                  Solo Participant
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="participationType"
                    value="team"
                    checked={formData.participationType === "team"}
                    onChange={handleInputChange}
                  />
                  Team Participant
                </label>
              </div>
            </div>

            {formData.participationType === "team" && (
              <>
                <div className="form-group">
                  <label htmlFor="teamName">Team Name</label>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Team Members</label>
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="team-member-row">
                      <input
                        type="text"
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) =>
                          handleTeamMemberChange(index, "name", e.target.value)
                        }
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={member.email}
                        onChange={(e) =>
                          handleTeamMemberChange(index, "email", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={member.role}
                        onChange={(e) =>
                          handleTeamMemberChange(index, "role", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="btn btn-danger btn-small">
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
              </>
            )}
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-group">
              <label htmlFor="tshirtSize">T-Shirt Size</label>
              <select
                id="tshirtSize"
                name="tshirtSize"
                value={formData.tshirtSize}
                onChange={handleInputChange}>
                <option value="">Select Size</option>
                {tshirtSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="motivation">Motivation *</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                rows="4"
                placeholder="Why do you want to participate in this hackathon?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="previousExperience">Previous Experience</label>
              <textarea
                id="previousExperience"
                name="previousExperience"
                value={formData.previousExperience}
                onChange={handleInputChange}
                rows="3"
                placeholder="Tell us about your previous hackathon or project experience"
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectIdeas">Project Ideas</label>
              <textarea
                id="projectIdeas"
                name="projectIdeas"
                value={formData.projectIdeas}
                onChange={handleInputChange}
                rows="3"
                placeholder="Any initial project ideas for this hackathon?"
              />
            </div>
          </div>

          {/* Agreements */}
          <div className="form-section">
            <h3>Agreements</h3>
            <div className="checkbox-group">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                />
                I agree to the terms and conditions *
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="agreeToPhotos"
                  checked={formData.agreeToPhotos}
                  onChange={handleInputChange}
                />
                I agree to be photographed during the event
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="agreeToCodeOfConduct"
                  checked={formData.agreeToCodeOfConduct}
                  onChange={handleInputChange}
                  required
                />
                I agree to follow the code of conduct *
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={submitting}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}>
              {submitting ? "Updating..." : "Update Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HackathonRegistrationEdit;
