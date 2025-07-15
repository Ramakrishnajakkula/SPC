import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HackathonCreate.css";
import { getHackathonUrl } from "../config/api";
import API_CONFIG from "../config/api";

const HackathonCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    shortDescription: "",
    detailedDescription: "",
    theme: "",
    tags: [],

    // Dates and Location
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    location: "",
    venue: "",
    mode: "hybrid", // online, offline, hybrid

    // Participation Details
    teamSizeMin: 1,
    teamSizeMax: 4,
    maxParticipants: 100,
    eligibility: "",
    skillLevel: "all", // beginner, intermediate, advanced, all

    // Prizes and Rewards
    totalPrizePool: "",
    prizes: [
      { position: "1st Place", amount: "", description: "" },
      { position: "2nd Place", amount: "", description: "" },
      { position: "3rd Place", amount: "", description: "" },
    ],

    // Judging Criteria
    judgingCriteria: [
      { criterion: "Innovation & Creativity", weight: 25 },
      { criterion: "Technical Implementation", weight: 25 },
      { criterion: "Business Viability", weight: 25 },
      { criterion: "Presentation & Demo", weight: 25 },
    ],

    // Resources and Rules
    resources: "",
    rules: "",
    schedule: "",

    // Contact and Organization
    organizerName: "",
    organizerEmail: "",
    organizerPhone: "",
    website: "",
    socialMedia: {
      twitter: "",
      linkedin: "",
      instagram: "",
      discord: "",
    },

    // Additional Settings
    isPublished: false,
    allowTeamFormation: true,
    requireResume: false,
    enableMentorship: true,
    enableWorkshops: false,

    // Special Features
    specialFeatures: [],
    sponsors: [],
    mentors: [],
    workshops: [],
  });

  const themeOptions = [
    "Artificial Intelligence & Machine Learning",
    "Web Development",
    "Mobile App Development",
    "Blockchain & Cryptocurrency",
    "IoT & Hardware",
    "Data Science & Analytics",
    "Cybersecurity",
    "Game Development",
    "AR/VR & Metaverse",
    "FinTech",
    "HealthTech",
    "EdTech",
    "Social Impact",
    "Open Innovation",
    "Sustainability & Green Tech",
  ];

  const specialFeatureOptions = [
    "Live Streaming",
    "Real-time Chat",
    "Mentor Sessions",
    "Workshops & Tutorials",
    "Networking Events",
    "API Partnerships",
    "Hardware Provision",
    "Cloud Credits",
    "Design Resources",
    "Code Review Sessions",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addPrize = () => {
    setFormData((prev) => ({
      ...prev,
      prizes: [...prev.prizes, { position: "", amount: "", description: "" }],
    }));
  };

  const removePrize = (index) => {
    setFormData((prev) => ({
      ...prev,
      prizes: prev.prizes.filter((_, i) => i !== index),
    }));
  };

  const addJudgingCriterion = () => {
    setFormData((prev) => ({
      ...prev,
      judgingCriteria: [...prev.judgingCriteria, { criterion: "", weight: 0 }],
    }));
  };

  const removeJudgingCriterion = (index) => {
    setFormData((prev) => ({
      ...prev,
      judgingCriteria: prev.judgingCriteria.filter((_, i) => i !== index),
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleSpecialFeaturesChange = (feature) => {
    setFormData((prev) => ({
      ...prev,
      specialFeatures: prev.specialFeatures.includes(feature)
        ? prev.specialFeatures.filter((f) => f !== feature)
        : [...prev.specialFeatures, feature],
    }));
  };

  const validateForm = () => {
    if (!formData.title || !formData.shortDescription || !formData.theme) {
      alert("Please fill in all required fields (Title, Description, Theme)");
      return false;
    }

    if (
      !formData.startDate ||
      !formData.endDate ||
      !formData.registrationDeadline
    ) {
      alert("Please fill in all date fields");
      return false;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert("End date must be after start date");
      return false;
    }

    if (
      new Date(formData.registrationDeadline) >= new Date(formData.startDate)
    ) {
      alert("Registration deadline must be before hackathon start date");
      return false;
    }

    if (!formData.organizerName || !formData.organizerEmail) {
      alert("Please provide organizer contact information");
      return false;
    }

    const totalWeight = formData.judgingCriteria.reduce(
      (sum, criterion) => sum + (criterion.weight || 0),
      0
    );
    if (totalWeight !== 100) {
      alert("Judging criteria weights must sum to 100%");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post(
        getHackathonUrl(API_CONFIG.ENDPOINTS.HACKATHONS.BASE),
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert("Hackathon created successfully!");
      navigate("/hackathon");
    } catch (error) {
      console.error("Error creating hackathon:", error);
      alert(
        error.response?.data?.message ||
          "Failed to create hackathon. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async () => {
    setLoading(true);
    try {
      await axios.post(
        getHackathonUrl(API_CONFIG.ENDPOINTS.HACKATHONS.DRAFT),
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hackathon-create-page">
      <div className="create-header">
        <div className="create-hero">
          <h1>Create a New Hackathon</h1>
          <p>
            Build an amazing hackathon experience for developers and innovators
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="create-form">
        {/* Basic Information */}
        <div className="form-section">
          <h2 className="section-title">Basic Information</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="title">Hackathon Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., TechForGood Hackathon 2024"
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="shortDescription">Short Description *</label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                placeholder="Brief description for cards and listings"
                maxLength="150"
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="detailedDescription">Detailed Description</label>
              <textarea
                id="detailedDescription"
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleInputChange}
                rows="6"
                placeholder="Detailed description of your hackathon, goals, and expectations..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="theme">Theme *</label>
              <select
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                required>
                <option value="">Select Theme</option>
                {themeOptions.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags.join(", ")}
                onChange={handleTagsChange}
                placeholder="e.g., AI, Machine Learning, Web3"
              />
            </div>
          </div>
        </div>

        {/* Dates and Location */}
        <div className="form-section">
          <h2 className="section-title">Dates and Location</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date *</label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="registrationDeadline">
                Registration Deadline *
              </label>
              <input
                type="datetime-local"
                id="registrationDeadline"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mode">Event Mode</label>
              <select
                id="mode"
                name="mode"
                value={formData.mode}
                onChange={handleInputChange}>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location/City</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., San Francisco, CA"
              />
            </div>

            <div className="form-group">
              <label htmlFor="venue">Venue Details</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="e.g., Tech Hub, 123 Innovation Street"
              />
            </div>
          </div>
        </div>

        {/* Participation Details */}
        <div className="form-section">
          <h2 className="section-title">Participation Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="teamSizeMin">Minimum Team Size</label>
              <input
                type="number"
                id="teamSizeMin"
                name="teamSizeMin"
                value={formData.teamSizeMin}
                onChange={handleInputChange}
                min="1"
                max="10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="teamSizeMax">Maximum Team Size</label>
              <input
                type="number"
                id="teamSizeMax"
                name="teamSizeMax"
                value={formData.teamSizeMax}
                onChange={handleInputChange}
                min="1"
                max="10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxParticipants">Maximum Participants</label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleInputChange}
                min="10"
                step="10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="skillLevel">Skill Level</label>
              <select
                id="skillLevel"
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleInputChange}>
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="eligibility">Eligibility Criteria</label>
              <textarea
                id="eligibility"
                name="eligibility"
                value={formData.eligibility}
                onChange={handleInputChange}
                rows="3"
                placeholder="Who can participate? Any age, experience, or location restrictions?"
              />
            </div>
          </div>
        </div>

        {/* Prizes and Rewards */}
        <div className="form-section">
          <h2 className="section-title">Prizes and Rewards</h2>
          <div className="form-group">
            <label htmlFor="totalPrizePool">Total Prize Pool</label>
            <input
              type="text"
              id="totalPrizePool"
              name="totalPrizePool"
              value={formData.totalPrizePool}
              onChange={handleInputChange}
              placeholder="e.g., $10,000, ₹50,000"
            />
          </div>

          <div className="prizes-section">
            <h3>Prize Breakdown</h3>
            {formData.prizes.map((prize, index) => (
              <div key={index} className="prize-row">
                <input
                  type="text"
                  placeholder="Position (e.g., 1st Place)"
                  value={prize.position}
                  onChange={(e) =>
                    handleArrayChange(
                      "prizes",
                      index,
                      "position",
                      e.target.value
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Amount (e.g., $5,000)"
                  value={prize.amount}
                  onChange={(e) =>
                    handleArrayChange("prizes", index, "amount", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Additional rewards/description"
                  value={prize.description}
                  onChange={(e) =>
                    handleArrayChange(
                      "prizes",
                      index,
                      "description",
                      e.target.value
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() => removePrize(index)}
                  className="btn-remove">
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPrize}
              className="btn btn-secondary">
              Add Prize
            </button>
          </div>
        </div>

        {/* Judging Criteria */}
        <div className="form-section">
          <h2 className="section-title">Judging Criteria</h2>
          <div className="criteria-section">
            {formData.judgingCriteria.map((criterion, index) => (
              <div key={index} className="criterion-row">
                <input
                  type="text"
                  placeholder="Criterion (e.g., Innovation)"
                  value={criterion.criterion}
                  onChange={(e) =>
                    handleArrayChange(
                      "judgingCriteria",
                      index,
                      "criterion",
                      e.target.value
                    )
                  }
                />
                <input
                  type="number"
                  placeholder="Weight %"
                  value={criterion.weight}
                  onChange={(e) =>
                    handleArrayChange(
                      "judgingCriteria",
                      index,
                      "weight",
                      parseInt(e.target.value)
                    )
                  }
                  min="0"
                  max="100"
                />
                <button
                  type="button"
                  onClick={() => removeJudgingCriterion(index)}
                  className="btn-remove">
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addJudgingCriterion}
              className="btn btn-secondary">
              Add Criterion
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="form-section">
          <h2 className="section-title">Organizer Contact Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="organizerName">Organizer Name *</label>
              <input
                type="text"
                id="organizerName"
                name="organizerName"
                value={formData.organizerName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="organizerEmail">Organizer Email *</label>
              <input
                type="email"
                id="organizerEmail"
                name="organizerEmail"
                value={formData.organizerEmail}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="organizerPhone">Phone Number</label>
              <input
                type="tel"
                id="organizerPhone"
                name="organizerPhone"
                value={formData.organizerPhone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <h3>Social Media</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="socialMedia.twitter">Twitter</label>
              <input
                type="url"
                id="socialMedia.twitter"
                name="socialMedia.twitter"
                value={formData.socialMedia.twitter}
                onChange={handleInputChange}
                placeholder="https://twitter.com/youraccount"
              />
            </div>

            <div className="form-group">
              <label htmlFor="socialMedia.linkedin">LinkedIn</label>
              <input
                type="url"
                id="socialMedia.linkedin"
                name="socialMedia.linkedin"
                value={formData.socialMedia.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
          </div>
        </div>

        {/* Special Features */}
        <div className="form-section">
          <h2 className="section-title">Special Features</h2>
          <div className="checkbox-grid">
            {specialFeatureOptions.map((feature) => (
              <label key={feature} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.specialFeatures.includes(feature)}
                  onChange={() => handleSpecialFeaturesChange(feature)}
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="form-section">
          <h2 className="section-title">Settings</h2>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="allowTeamFormation"
                checked={formData.allowTeamFormation}
                onChange={handleInputChange}
              />
              <span>Allow team formation on platform</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="requireResume"
                checked={formData.requireResume}
                onChange={handleInputChange}
              />
              <span>Require resume/CV for registration</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="enableMentorship"
                checked={formData.enableMentorship}
                onChange={handleInputChange}
              />
              <span>Enable mentorship program</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="enableWorkshops"
                checked={formData.enableWorkshops}
                onChange={handleInputChange}
              />
              <span>Include workshops and tutorials</span>
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
            type="button"
            onClick={saveDraft}
            disabled={loading}
            className="btn btn-outline">
            Save Draft
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Creating..." : "Create Hackathon"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HackathonCreate;
