document.getElementById('ixbq').addEventListener('click', function(event) {
  // Check if the clicked target is a link within the dropdown
  if (event.target.tagName === 'A') {
      return;  // Allow the link to be followed
  }

  var dropdown = this.querySelector('.dropdown-content');
  if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
  } else {
      dropdown.style.display = 'block';
  }
});


document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all card elements
    document.querySelectorAll('.card').forEach(function(card) {
      card.addEventListener('click', function() {
        var cardDesc = this.querySelector('.card-desc');
        cardDesc.classList.toggle('visible');
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('userPlot').getContext('2d');
    const trueData = [10, 30, 60, 100, 150, 210, 280, 360, 450, 550]; // Example true data
    const commentSection = document.getElementById('comment');

    let userChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 10 }, (_, i) => `${i + 1} pound battery`),
            datasets: [{
                label: 'Your Estimated Impact',
                data: Array(10).fill(0),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Number of Batteries Recycled'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Environmental Value ($)'
                    },
                    beginAtZero: true,
                    min: 0,
                    max: 600,
                    ticks: {
                        stepSize: 50,
                        callback: function(value) {
                            return value;
                        }
                    }
                }
            },
            plugins: {
                dragData: {
                    round: 1,
                    onDrag: function(e, datasetIndex, index, value) {
                        e.target.style.cursor = 'grabbing';
                    },
                    onDragEnd: function(e, datasetIndex, index, value) {
                        e.target.style.cursor = 'default';
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Environmental Value: ${context.raw} units`;
                        }
                    }
                }
            }
        }
    });

    document.getElementById('revealButton').addEventListener('click', function() {
        const userData = userChart.data.datasets[0].data;
        let totalDeviation = 0;

        trueData.forEach((value, index) => {
            totalDeviation += Math.abs(value - userData[index]);
        });

        const averageDeviation = totalDeviation / trueData.length;
        const averageTrueValue = trueData.reduce((a, b) => a + b, 0) / trueData.length;
        const deviationPercentage = (averageDeviation / averageTrueValue) * 100;

        userChart.data.datasets.push({
            label: 'True Impact',
            data: trueData,
            borderColor: 'green',
            fill: false,
            tension: 0.1
        });

        userChart.update();

        if (deviationPercentage > 30) {
            commentSection.innerHTML = `
                <strong>Your estimate deviated significantly from the true impact.</strong><br>
                <p>When you throw away an old battery, you might think nothing of it except for maybe a quick “oh well” or 
                “someone else will take care of this one” before walking away from it.
                However, there are many hidden costs associated with throwing away a battery that you may not even be aware 
                of until after it has been thrown in the trash.</p>
      
                <p>When you recycle your batteries, you’re keeping them out of landfills. Landfills are one of the most harmful ways 
                to dispose of waste because they can cause serious environmental damage. Batteries that end up in landfills may 
                eventually corrode and decay, releasing dangerous chemicals into the environment—including battery acid! 
                These chemicals can seep into our soil, water sources, and even the air. This is bad for both our environment 
                and our health.</p>

                <p>Some core battery materials include copper and aluminum. These are materials that we can recycle and reuse endlessly, 
                ensuring that we can continue to create batteries while consuming far fewer resources. The impact of battery recycling
                on the environment here is crucial. We can avoid depleting the environment of natural resources and prevent shortages
                from occurring—ensuring batteries remain plentiful and affordable.</p>
            `;
            commentSection.className = 'fade-in red';
        } else {
            commentSection.innerHTML = `
                <strong>You have done an excellent job!</strong><br>
            `;
            commentSection.className = 'fade-in green';
        }
    });
});



