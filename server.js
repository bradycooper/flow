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
    questionDescription: 'Who are you designing your rewards program for? Choose the group of customers or individuals you want to target with your rewards program. Your selection will influence the types of rewards and actions you can incentivize.',
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
    questionDescription: 'How do customers qualify to participate in your rewards program? Select the criteria that customers must meet in order to join. This could be based on registration, event attendance, or other actions.',
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
    questionDescription: 'What type of rewards program are you offering? Choose the reward structure that best aligns with your business goals. This could include cashback, loyalty points, or giveaways, depending on the behavior you want to incentivize.',
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
    questionDescription: 'What specific behaviors do you want to reward? Select the actions that customers must take to earn rewards, such as making purchases, engaging on social media, or referring others. This will determine the overall goal of your program.',
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
    questionDescription: 'What rewards will customers receive? Choose the type of reward you want to offer participants in your program. This could include cash, points, exclusive offers, or special treatment, depending on what best motivates your customers.',
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
  },
  {
    id: '6',
    text: 'How do customers earn rewards?',
    questionDescription: 'How will customers earn rewards? Select the method through which customers will qualify for rewards. This could be based on purchases, participation in contests, referrals, or social media engagement.',
    answers: [
      {
        name: "Purchase Patterns",
        shortDescription: "Rewards based on purchase patterns.",
        longDescription: "Customers earn rewards based on the number of purchases made. This could be measured by various factors such as purchase amount, frequency, or size of the order."
      },
      {
        name: "Purchase Amount",
        shortDescription: "Rewards based on purchase amount.",
        longDescription: "Rewards are given depending on the total value of a customer's purchase. Higher purchase amounts may lead to better rewards."
      },
      {
        name: "Purchase Frequency",
        shortDescription: "Rewards based on how often customers purchase.",
        longDescription: "Rewards are based on how often a customer makes a purchase, encouraging repeat visits."
      },
      {
        name: "Time-Based",
        shortDescription: "Rewards based on specific time periods.",
        longDescription: "Customers earn rewards by purchasing within a specific time window, such as during promotions or peak seasons."
      },
      {
        name: "Purchase Size",
        shortDescription: "Rewards based on the size of the purchase.",
        longDescription: "Rewards are tied to the quantity or size of a single order, encouraging larger purchases."
      },
      {
        name: "Contests",
        shortDescription: "Rewards given through contests.",
        longDescription: "Customers participate in contests to win rewards, typically requiring them to perform specific tasks or enter a drawing."
      },
      {
        name: "Gamification",
        shortDescription: "Incentivize participation through games.",
        longDescription: "Use game-like features such as points, levels, and badges to engage customers and reward them for their actions."
      },
      {
        name: "Loyalty Duration",
        shortDescription: "Rewards based on how long customers stay loyal.",
        longDescription: "Customers are rewarded for remaining loyal to the brand over time, often based on milestones or membership duration."
      },
      {
        name: "Referrals",
        shortDescription: "Reward for referring new customers.",
        longDescription: "Customers earn rewards by referring friends, family, or new customers to the brand."
      },
      {
        name: "Social Media Engagement",
        shortDescription: "Rewards for social media posts.",
        longDescription: "Customers earn rewards by posting about the brand on social media or creating user-generated content."
      },
      {
        name: "Lottery",
        shortDescription: "Random rewards through a lottery system.",
        longDescription: "Customers are entered into a lottery or lucky draw where winners are chosen at random to receive rewards."
      },
      {
        name: "Random Rewards",
        shortDescription: "Rewards are given randomly.",
        longDescription: "Rewards are distributed randomly to customers, creating an element of surprise and excitement."
      }
    ]
  },
  {
    id: '7',
    text: 'How much do customers earn?',
    questionDescription: 'How will the reward amount be calculated? Choose how much customers will earn based on their actions. Rewards can be a fixed amount, a percentage of their purchase, or based on performance or tier levels.',
    answers: [
      {
        name: "Fixed Value",
        shortDescription: "Reward a fixed value for participation.",
        longDescription: "Customers earn a set, fixed amount for completing the desired action. This amount does not change regardless of performance or status."
      },
      {
        name: "Fixed Percentage",
        shortDescription: "Reward a fixed percentage.",
        longDescription: "Customers earn a percentage of their total purchase amount as a reward. This is common in cashback or discount programs."
      },
      {
        name: "Performance-Based",
        shortDescription: "Rewards change based on performance.",
        longDescription: "The reward value changes depending on the customer's performance, such as how much they spend or how many referrals they make."
      },
      {
        name: "Tiered Rewards",
        shortDescription: "Rewards increase with higher tiers.",
        longDescription: "Customers can earn tiered rewards, where they receive better rewards for reaching higher levels of spending, referrals, or loyalty status."
      }
    ]
  },
  {
    id: '8',
    text: 'When do customers receive their rewards?',
    questionDescription: 'When will customers receive their rewards? Decide when customers can redeem their rewards. This could be immediately after completing an action, during subsequent purchases, or within a specific time frame.',
    answers: [
      {
        name: "Immediate",
        shortDescription: "Customers get the reward immediately.",
        longDescription: "Customers can redeem their reward as soon as they complete the required action, such as after making a purchase or referring a friend."
      },
      {
        name: "Future Purchase",
        shortDescription: "Rewards are applied to future purchases.",
        longDescription: "Customers earn rewards that can only be redeemed on future purchases, encouraging return business."
      },
      {
        name: "Time-Limited Claim",
        shortDescription: "Rewards must be claimed within a certain time.",
        longDescription: "Customers must redeem their rewards within a specified time frame, or the reward will expire."
      },
      {
        name: "Limited-Time Offer",
        shortDescription: "Offer valid for a short time.",
        longDescription: "Customers must act within a limited time to redeem the reward or participate in the offer."
      },
      {
        name: "Expiration Date",
        shortDescription: "Rewards have a set expiration date.",
        longDescription: "Rewards must be redeemed before their expiration date; otherwise, they will no longer be valid."
      },
      {
        name: "First-Come-First-Served",
        shortDescription: "Rewards for being among the first.",
        longDescription: "Rewards are given to the first or specific number of customers who complete an action, such as the first 100 purchasers or the 10th visitor."
      },
      {
        name: "Random Intervals",
        shortDescription: "Rewards are given at random intervals.",
        longDescription: "Customers receive rewards randomly, either after purchases or during specific times, adding an element of surprise."
      }
    ]
  },
  {
    id: '9',
    text: 'What status levels are available in the program?',
    questionDescription: 'Does the program offer any special status for customers? Select if your program will recognize certain customers with VIP status, special treatment, or advanced notice for events and offers.',
    answers: [
      {
        name: "No Status",
        shortDescription: "No status recognition.",
        longDescription: "The program does not include any status levels or VIP recognition for customers."
      },
      {
        name: "VIP Status",
        shortDescription: "Recognize customers with VIP status.",
        longDescription: "Customers who reach certain milestones or spend thresholds can achieve VIP status and receive exclusive rewards or recognition."
      },
      {
        name: "Special Treatment",
        shortDescription: "Offer special treatment to top customers.",
        longDescription: "Customers receive special treatment such as personalized offers, concierge service, or exclusive event invitations."
      },
      {
        name: "Advanced Notice",
        shortDescription: "Offer advanced notice of offers and events.",
        longDescription: "Customers with higher status receive advanced notice of upcoming sales, exclusive events, or product releases before the general public."
      }
    ]
  },
  {
    id: '10',
    text: 'Who receives the rewards?',
    questionDescription: 'Who will receive the reward? Choose who the beneficiary of the reward will be. The reward can go to the customer who completes the action, a charity, or another individual chosen by the customer.',
    answers: [
      {
        name: "Customer",
        shortDescription: "The customer who completes the action earns the reward.",
        longDescription: "The consumer who performs the specified action, such as making a purchase or referring a friend, receives the reward."
      },
      {
        name: "Chosen Beneficiary",
        shortDescription: "The reward goes to a person of the customer's choosing.",
        longDescription: "The customer can choose a specified beneficiary, such as a family member or friend, to receive the reward instead of themselves."
      },
      {
        name: "Company-Supported Cause",
        shortDescription: "The reward goes to a cause supported by the company.",
        longDescription: "The reward is donated to a company-supported cause or charity, benefiting a larger social or community goal."
      },
      {
        name: "Customer-Chosen Charity",
        shortDescription: "The customer can donate the reward to a charity.",
        longDescription: "The customer can choose a charity to receive the reward, donating the reward amount to the chosen charity."
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
  console.log('Sending questions:', JSON.stringify(questions[0], null, 2));
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