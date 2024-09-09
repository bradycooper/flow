const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'client/build')));

const questions = [
  {
    id: '1',
    text: 'Who are you targeting for the program?',
    answers: [
      {
        name: 'Old Customer',
        shortDescription: 'Target your returning customers.',
        longDescription: 'Create a rewards program focused on retaining and incentivizing your existing customers who have made purchases before.'
      },
      {
        name: 'Influencer',
        shortDescription: 'Target social media influencers.',
        longDescription: 'Design a program to engage influencers who can promote your brand through their social media channels.'
      },
      {
        name: 'Affiliate',
        shortDescription: 'Engage affiliates to promote your products.',
        longDescription: 'Develop a program for affiliates to help increase product sales by promoting to their own networks.'
      },
      {
        name: 'Collaborative Campaign',
        shortDescription: 'Reach out to customers from a partner brand.',
        longDescription: 'Run a joint campaign with another brand to attract their customer base and cross-promote products.'
      }
    ]
  },
  {
    id: '2',
    text: 'What are the qualification criteria?',
    answers: [
      {
        name: "Free",
        shortDescription: "Open to all customers without conditions.",
        longDescription: "No cost or requirements to join the rewards program. Anyone can participate."
      },
      {
        name: "Registration",
        shortDescription: "Requires sign-up to participate.",
        longDescription: "Customers must register to join the program and gain access to rewards."
      },
      {
        name: "Lucky Event",
        shortDescription: "Participation through chance-based events.",
        longDescription: "Customers join the program by winning or being selected through a random lucky event."
      },
      {
        name: "Event Attendance",
        shortDescription: "Participation through event attendance.",
        longDescription: "Customers must attend a specific event to qualify for the rewards program."
      },
      {
        name: "Customer Service Screening",
        shortDescription: "Customers must go through a service or screening process.",
        longDescription: "Participation requires customers to engage with customer service or pass a specific screening process."
      },
      {
        name: "Pay to Play",
        shortDescription: "Requires payment to join the program.",
        longDescription: "Customers must pay a fee to access rewards and participate in the program."
      },
      {
        name: "Subscribe",
        shortDescription: "Requires subscription for participation.",
        longDescription: "Only customers with active subscriptions to your product or service can join the program."
      },
      {
        name: "Invitation Only",
        shortDescription: "Exclusive participation by invitation.",
        longDescription: "The program is exclusive, and customers can only join if they receive an invitation from your business."
      }
    ]
  },
  {
    id: '3',
    text: 'What type of reward program do you want to implement?',
    answers: [
      {
        name: "Bonus",
        shortDescription: "Offer bonuses for specific actions.",
        longDescription: "Customers earn a bonus reward for completing specific actions like purchases, referrals, or event participation."
      },
      {
        name: "Cashback",
        shortDescription: "Offer cashback on purchases.",
        longDescription: "Customers earn a percentage of their spending back as cashback, which can be used for future purchases."
      },
      {
        name: "Discount Programs",
        shortDescription: "Offer discounts on purchases.",
        longDescription: "Provide customers with discounts on future purchases as part of the rewards program."
      },
      {
        name: "Giveaways",
        shortDescription: "Run giveaways for participants.",
        longDescription: "Participants can enter giveaways and have a chance to win rewards such as products, vouchers, or experiences."
      },
      {
        name: "Loyalty Points",
        shortDescription: "Offer points for each purchase.",
        longDescription: "Customers earn points for every purchase they make, which can later be redeemed for rewards or discounts."
      },
      {
        name: "Referral/Affiliate Programs",
        shortDescription: "Reward customers for referring others.",
        longDescription: "Customers can refer friends, family, or other potential customers to your business and earn rewards when they make a purchase."
      }
    ]
  },
  {
    id: '4',
    text: 'What behavior are you trying to incentivize?',
    answers: [
      {
        name: "Buying",
        shortDescription: "Reward customers for making purchases.",
        longDescription: "Customers receive rewards for completing purchases within the program. This encourages buying behavior."
      },
      {
        name: "Repeat Purchasing",
        shortDescription: "Encourage customers to make repeat purchases.",
        longDescription: "Offer rewards to customers for consistently returning and making multiple purchases over time."
      },
      {
        name: "Social Media Engagement",
        shortDescription: "Encourage customers to engage on social media.",
        longDescription: "Reward customers for posting about your brand on social media, liking, sharing, or creating user-generated content (UGC)."
      },
      {
        name: "Word of Mouth",
        shortDescription: "Incentivize customers to recommend your brand.",
        longDescription: "Reward customers for spreading the word about your brand to their network through personal recommendations."
      },
      {
        name: "Affiliate Participation",
        shortDescription: "Encourage participation in affiliate marketing.",
        longDescription: "Provide rewards to affiliates who successfully promote your products and generate sales."
      },
      {
        name: "Creating Reviews and UGC",
        shortDescription: "Reward for generating reviews and content.",
        longDescription: "Encourage customers to leave reviews or create user-generated content (UGC) that promotes your product or brand."
      },
      {
        name: "Subscribing/Renewals",
        shortDescription: "Incentivize subscriptions and renewals.",
        longDescription: "Offer rewards to customers who subscribe to your service or renew their subscriptions for ongoing benefits."
      },
      {
        name: "Attendance",
        shortDescription: "Encourage event attendance.",
        longDescription: "Reward customers for attending specific events hosted by your brand, either virtually or in-person."
      },
      {
        name: "Milestones",
        shortDescription: "Reward customers for reaching milestones.",
        longDescription: "Provide rewards for customers who achieve specific milestones such as purchasing anniversaries or spending goals."
      },
      {
        name: "Feedback",
        shortDescription: "Incentivize customer feedback.",
        longDescription: "Encourage customers to provide feedback on your products or services in exchange for rewards."
      }
    ]
  },
  {
    id: '5',
    text: 'What types of rewards do you want to offer?',
    answers: [
      {
        name: "Cash",
        shortDescription: "Reward with cash or equivalent.",
        longDescription: "Customers earn a cash reward based on their activity in the program, which can be redeemed or used for future purchases."
      },
      {
        name: "Credits/Points",
        shortDescription: "Reward with points that can be redeemed.",
        longDescription: "Customers earn points for their actions, which can be accumulated and redeemed for various rewards, including discounts or products."
      },
      {
        name: "Gift Cards",
        shortDescription: "Offer gift cards as rewards.",
        longDescription: "Customers can earn gift cards that can be redeemed at your store or through partner merchants."
      },
      {
        name: "Recognition",
        shortDescription: "Offer non-monetary rewards like recognition.",
        longDescription: "Reward customers with recognition, such as highlighting them as a top customer or featuring them in your community."
      },
      {
        name: "Shipping/Fees",
        shortDescription: "Waive shipping fees or other service fees.",
        longDescription: "Customers receive free shipping or waived service fees as a reward for their participation."
      },
      {
        name: "Exclusive Offers",
        shortDescription: "Offer exclusive deals and discounts.",
        longDescription: "Customers receive access to exclusive discounts or offers only available to program members."
      },
      {
        name: "Products",
        shortDescription: "Offer free or discounted products.",
        longDescription: "Provide customers with free or discounted products as a reward for their participation in the program."
      },
      {
        name: "Special Treatment - Exclusivity",
        shortDescription: "Offer exclusive access or superior service.",
        longDescription: "Customers can receive special treatment, such as exclusive access to events or priority customer service."
      }
    ]
  }
];

// Add this near the top of your routes
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// API route
app.get('/api/questions', (req, res) => {
  // This should send JSON data, not HTML
  res.json(questions);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Error: Port ${port} is already in use. Please free up port ${port} or choose a different port.`);
    process.exit(1);
  } else {
    console.error(err);
  }
});