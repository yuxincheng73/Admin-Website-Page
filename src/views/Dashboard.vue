<template>
  <div class="dashboard">
      <h1 class="page-header">Dashboard</h1>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-xl-6">
          <button @click="test">HI</button>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-xl-6 mb-5">
              <div class="card gradient-purple">
                <div class="users-icon">
                  <i class="fas fa-users"></i>
                </div>
                <div class="card-body">
                  <h6>Users</h6>
                  <h4>{{ numberOfUsers }}</h4>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-xl-6 mb-5">
              <div class="card gradient-orange">
                <div class="startups-icon">
                  <i class="fas fa-user-tie"></i>
                </div>
                <div class="card-body">
                  <h6>Startups</h6>
                  <h4>{{ numberOfStartups }}</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-xl-6 mb-5">
              <div class="card gradient-green">
                <div class="talent-user-icon">
                  <i class="fas fa-user"></i>
                </div>
                <div class="talent-search-icon">
                  <i class="fas fa-search"></i>
                </div>
                <div class="card-body">
                  <h6>Talent</h6>
                  <h4>{{ numberOfTalent }}</h4>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-xl-6 mb-5">
              <div class="card gradient-blue">
                <div class="jobs-icon">
                  <i class="fas fa-briefcase"></i>
                </div>
                <div class="card-body">
                  <h6>Jobs</h6>
                  <h4>{{ numberOfJobs }}</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-xl-6 mb-5">
              <div class="card gradient-red">
                <div class="jobapplication-icon">
                  <i class="fas fa-file"></i>
                </div>
                <div class="card-body">
                  <h6>Job Applications</h6>
                  <h4>{{ numberOfJobApplications }}</h4>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-xl-6 mb-5">
              <div class="card gradient-yellow">
                <div class="talentcontacted-icon">
                  <i class="fas fa-address-book"></i>
                </div>
                <div class="card-body">
                  <h6>Talent Contacted</h6>
                  <h4>{{ numberOfTalentContact }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-6 col-lg-4 col-md-4 col-xl-6 mb-5">
          <div class="card general-detail">
            <div class="wrapper-doughnut">
              <p>Number of jobs within 3 months out of number of job applications:</p>
              <div class="container-doughnut">
                <div>
                  <canvas id="dashboardChart2" style="width: 100%, height: 100%"></canvas>
                </div>
                <div class="doughnut-value">{{ this.percentageOfJobs }}%</div>
              </div>
              <p>Startups needing checking:</p>
              <div class="container-doughnut">
                <div>
                  <canvas id="dashboardChart3" style="width: 100%, height: 100%"></canvas>
                </div>
                <div class="doughnut-value">{{ this.numberOfJobsNeedChecking }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-lg-6 col-md-6 col-xl-12 mb-5">
          <div class="card job-roles">
            <div class="card-header">
              <h3>Job Roles</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div v-for="(job, index) in jobRoles" :key="index" class="col-lg-6 col-md-6 col-xs-12 col-xl-6">
                  <span class="job-roles-title">{{ job.name }}</span>
                  <div class="progress">
                    <div class="progress-bar" :data-value="job.percentage" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{ job.value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-8 col-lg-4 col-md-4 col-xl-8 mb-5">
          <div class="card job-types">
            <canvas id="dashboardChart"></canvas>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js';

export default {
  name: 'dashboard',
  mounted() {
    this.moveProgressBar();
    this.convertPercentage();
    this.moveBarGraph();
    this.moveDoughnutGraph();
  },
  data() {
    return {
      numberOfUsers: 2192,
      numberOfStartups: 15040,
      numberOfTalent: 254,
      numberOfJobs: 1423,
      percentageOfJobs: 0,
      radianOfJobs: 0,
      numberOfJobApplications: 23045,
      numberOfTalentContact: 3434,
      maxNumberOfJobs: 50000,
      numberOfJobsNeedChecking: 0,
      radianOfJobsNeedChecking: 0,
      jobRoles: [{ name: 'Developer', value: 5325, percentage: 75 }, { name: 'Marketing', value: 3543, percentage: 50 }, { name: 'Software Engineer', value: 4535, percentage: 50 }, { name: 'Creative & Design', value: 234, percentage: 25 }, { name: 'CEO', value: 13, percentage: 13 }, { name: 'Media/Blogger', value: 5342, percentage: 80 }, { name: 'Sales/Business Developer', value: 1432, percentage: 35 }, { name: 'Strategy & Planning', value: 3433, percentage: 78 }, { name: 'HR/Legal', value: 2345, percentage: 54 }, { name: 'Logistics', value: 343, percentage: 12 }],
      jobTypes: [{ type: 'Full-time', typeNumber: 1231, percentage: 54 }, { type: 'Freelance', typeNumber: 3231, percentage: 70 }, { type: 'Intern', typeNumber: 543, percentage: 92 }, { type: 'Part time', typeNumber: 231, percentage: 43 }, { type: 'Volunteer', typeNumber: 112, percentage: 23 }, { type: 'Co-founder', typeNumber: 234, percentage: 54 }, { type: 'Mentor', typeNumber: 2345, percentage: 68 }],
      data: [],
    };
  },
  methods: {
    moveProgressBar() {
      const els = this.$el.getElementsByClassName('progress-bar');
      console.log(els);
      const arr = Array.from(els);
      console.log(arr);
      arr.forEach((element) => {
        let loadWidth = 0;
        const loadMax = element.dataset.value;
        const loadAmount = setInterval(() => {
          if (loadWidth >= 100) {
            clearInterval(loadAmount);
          } else if (loadWidth < loadMax) {
            loadWidth++;
            element.style.width = loadWidth + '%';
          }
        }, 5);
      });
    },
    moveBarGraph() {
      const ctx = document.getElementById('dashboardChart');
      const dashboardChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Full-time', 'Freelance', 'Intern', 'Part time', 'Volunteer', 'Co-founder', 'Mentor'],
          datasets: [{
            label: 'Number of Users',
            data:
              this.jobTypes.map((jt) => {
                return jt.percentage;
              }),
            backgroundColor: ['#70beff', '#70beff', '#70beff', '#70beff', '#70beff', '#70beff', '#70beff'],
            borderColor: ['#3a90d8', '#3a90d8', '#3a90d8', '#3a90d8', '#3a90d8', '#3a90d8', '#3a90d8'],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
      });
    },
    moveDoughnutGraph() {
      const ctx2 = document.getElementById('dashboardChart2');
      const dashboardChart2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [this.radianOfJobs],
            backgroundColor: ['#70beff'],
            borderColor: ['#3a90d8'],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 80,
          circumference: 2 * Math.PI,
          animate: {
            animateRotate: true,
          },
        },
      });
      const ctx3 = document.getElementById('dashboardChart3');
      const dashboardChart3 = new Chart(ctx3, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [this.radianOfJobsNeedChecking],
            backgroundColor: ['#70beff'],
            borderColor: ['#3a90d8'],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 80,
          circumference: 2 * Math.PI,
          animate: {
            animateRotate: true,
          },
        },
      });
    },
    convertPercentage() {
      this.percentageOfJobs = Math.round((this.numberOfJobs / this.numberOfJobApplications) * 100);
      this.radianOfJobs = (this.percentageOfJobs / 100) * (2 * Math.PI);
      console.log(this.radianOfJobs);
      this.numberOfJobsNeedChecking = this.numberOfJobApplications - this.numberOfJobs;
      this.radianOfJobsNeedChecking = (this.numberOfJobsNeedChecking / this.maxNumberOfJobs) * (2 * Math.PI);
      console.log(this.radianOfJobsNeedChecking);
    },
    test() {
      axios({
        method: 'GET',
        // headers: { 'X-AUTHORIZATION': '' },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
        },
        url: '',
      }).then((response) => {
        console.log(response.data);
        this.data = response.data;
      });
    },
  },
};
</script>
