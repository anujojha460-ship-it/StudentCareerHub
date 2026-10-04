
function showMessage() {
    alert("Welcome to Student Career Hub! 🚀");
}

function percentage() {
    let marks = prompt("Enter obtained marks:");
    let total = prompt("Enter total marks:");

    if (marks && total) {
        let result = (marks / total) * 100;
        alert("Your Percentage is: " + result.toFixed(2) + "%");
    }
}

function cgpa() {
    let value = prompt("Enter your CGPA:");

    if (value) {
        let result = value * 9.5;
        alert("Approx Percentage: " + result.toFixed(2) + "%");
    }
}

function attendance() {
    let present = prompt("Enter classes attended:");
    let total = prompt("Enter total classes:");

    if (present && total) {
        let result = (present / total) * 100;
        alert("Your Attendance is: " + result.toFixed(2) + "%");
    }
}

function resume() {
    alert("Resume Builder is coming soon! 📄");
}
function generateResume() {

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let education = document.getElementById("education").value;
    let skills = document.getElementById("skills").value;
    let experience = document.getElementById("experience").value;

    document.getElementById("resumeResult").innerHTML = `
        <div class="card">
            <h2>${name}</h2>
            <p>📱 ${phone}</p>
            <p>📧 ${email}</p>

            <hr><br>

            <h3>Education</h3>
            <p>${education}</p>

            <br>

            <h3>Skills</h3>
            <p>${skills}</p>

            <br>

            <h3>Experience</h3>
            <p>${experience}</p>
        </div>
    `;
}
function downloadResume() {
    window.print();
}
 
 function searchJobs(){
    let search = document.getElementById("jobSearch").value.toLowerCase();
    let category = document.getElementById("jobCategory").value;
    let location = document.getElementById("jobLocation").value;

    let jobs = document.querySelectorAll("#jobs .card");

    jobs.forEach(function(job) {

        let text = job.innerText.toLowerCase();

        let searchMatch = text.includes(search);

        let categoryMatch = true;
        let locationMatch = true;

        if (category === "it") {
            categoryMatch = text.includes("software developer");
        }

        if (category === "government") {
            categoryMatch = text.includes("government");
        }

        if (category === "sales") {
            categoryMatch = text.includes("business associate");
        }

        if (category === "internship") {
            categoryMatch = text.includes("digital marketing intern");
        }

        if (location === "remote") {
            locationMatch = text.includes("remote");
        }

        if (location === "bhopal") {
            locationMatch = text.includes("bhopal");
        }

        if (location === "indore") {
            locationMatch = text.includes("indore");
        }

        if (location === "delhi") {
            locationMatch = text.includes("delhi");
        }

        if (searchMatch && categoryMatch && locationMatch) {
            job.style.display = "block";
        } else {
            job.style.display = "none";
        }
    });
}

function showJobDetails(jobName) {
    alert(
        "Job: " + jobName +
        "\n\nEligibility: Fresher" +
        "\nLocation: India" +
        "\nJob Type: Full Time"
    );
}
function applyJob(jobName) {

    document.getElementById("applyForm").style.display = "block";

    document.getElementById("applyJobName").value = jobName;

    document.getElementById("applyForm").scrollIntoView({
        behavior: "smooth"
    });
}


function submitApplication() {
    let name = document.getElementById("applyName").value;
    let email = document.getElementById("applyEmail").value;
    let phone = document.getElementById("applyPhone").value;
    let job = document.getElementById("applyJobName").value;

    if (name === "" || email === "" || phone === "") {
        alert("Please fill all details.");
        return;
    }

    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    let applicationId = "SCH-" + (1001 + applications.length);

    let application = {
        id: applicationId,
        name: name,
        email: email,
        phone: phone,
        job: job
    };

    applications.push(application);

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

    alert(
        "Application Submitted Successfully! ✅\n\n" +
        "Application ID: " + applicationId
    );

    document.getElementById("applyName").value = "";
    document.getElementById("applyEmail").value = "";
    document.getElementById("applyPhone").value = "";
}

   
    function showApplications() {
    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    let list = document.getElementById("applicationList");

    if (applications.length === 0) {
        list.innerHTML = "<p>No applications submitted yet.</p>";
        return;
    }

    list.innerHTML = "";

    applications.forEach(function(app, index) {

        list.innerHTML += `
            <div class="card application-card">

                <h3>Application ${index + 1}</h3>
<p><b>🆔 Application ID:</b> ${app.id || "Old Application"}</p>

                <p><b>Name:</b> ${app.name}</p>
<p><b>📊 Status:</b> ${app.status || "Submitted"}</p>

<select onchange="updateApplicationStatus(${index}, this.value)">
    <option value="Submitted">Submitted</option>
    <option value="Under Review">Under Review</option>
    <option value="Shortlisted">Shortlisted</option>
    <option value="Rejected">Rejected</option>
</select>
                <p><b>Email:</b> ${app.email}</p>
                <p><b>Mobile:</b> ${app.phone}</p>
                <p><b>Job:</b> ${app.job}</p>

                <button onclick="deleteApplication(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}

function deleteApplication(index) {

    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    applications.splice(index, 1);

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

    showApplications();
}

function adminLogin() {
    let username = document.getElementById("adminUsername").value;
    let password = document.getElementById("adminPassword").value;

    if (username === "admin" && password === "1234") {
        alert("Admin Login Successful! ✅");

        openAdminDashboard();
    } else {
        alert("Wrong username or password ❌");
    }
}
function showAdminApplications() {
    showApplications();
}
function checkApplicationStatus() {
    let applicationId =
        document.getElementById("statusApplicationId").value.trim();

    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    let application = applications.find(
        function(app) {
            return app.id === applicationId;
        }
    );

    let result = document.getElementById("statusResult");

    if (!application) {
        result.innerHTML = `
            <div class="card">
                <h3>❌ Application Not Found</h3>
                <p>Please check your Application ID.</p>
            </div>
        `;
        return;
    }

    result.innerHTML = `
        <div class="card">
            <h3>✅ Application Found</h3>
            <p><b>🆔 Application ID:</b> ${application.id}</p>
            <p><b>👤 Name:</b> ${application.name}</p>
            <p><b>💼 Job:</b> ${application.job}</p>
            <p><b>📊 Status:</b> ${application.status || "Submitted"}</p>
        </div>
    `;
}
function updateApplicationStatus(index, status) {
    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    if (applications[index]) {
        applications[index].status = status;

        localStorage.setItem(
            "applications",
            JSON.stringify(applications)
        );

        alert("Application status updated! ✅");
    }
}
 function saveProfile() {

    let photo = document.getElementById("profilePhoto").files[0];

    let profile = {
        name: document.getElementById("profileName").value,
        phone: document.getElementById("profilePhone").value,
        email: document.getElementById("profileEmail").value,
        education: document.getElementById("profileEducation").value,
        skills: document.getElementById("profileSkills").value
    };

    if (!profile.name || !profile.phone || !profile.email) {
        alert("Please fill Name, Mobile and Email.");
        return;
    }

    localStorage.setItem(
        "studentProfile",
        JSON.stringify(profile)
    );

    if (photo) {

        let reader = new FileReader();

        reader.onload = function () {

            localStorage.setItem(
                "profilePhoto",
                reader.result
            );

            let img = document.getElementById("profilePhotoPreview");

            img.src = reader.result;
            img.style.display = "block";
        };

        reader.readAsDataURL(photo);
    }

    alert("Profile Saved Successfully! ✅");
}
function clearProfile() {
    localStorage.removeItem("studentProfile");

    document.getElementById("profileName").value = "";
    document.getElementById("profilePhone").value = "";
    document.getElementById("profileEmail").value = "";
    document.getElementById("profileEducation").value = "";
    document.getElementById("profileSkills").value = "";

    alert("Profile Cleared! 🗑️");
}
function showApplicationCount() {
    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    alert("📋 Total Applications: " + applications.length);
}
function submitServiceRequest() {
  const name = document.getElementById("serviceName").value;
  const mobile = document.getElementById("serviceMobile").value;
  const service = document.getElementById("serviceType").value;

  if (!name || !mobile || !service) {
    document.getElementById("serviceMessage").innerHTML =
      "Please fill all details.";
    return;
  }

  const request = {
    name: name,
    mobile: mobile,
    service: service
  };

  localStorage.setItem("careerServiceRequest", JSON.stringify(request));

  document.getElementById("serviceMessage").innerHTML =
    "✅ Request submitted successfully!";
}
function startResumeService() {
  document.getElementById("paymentPage").style.display = "block";
}
function payResume() {
  const upiUrl =
    "upi://pay?pa=8516828733@ybl&pn=Student%20Career%20Hub&am=49&cu=INR";

  window.location.href = upiUrl;
}
