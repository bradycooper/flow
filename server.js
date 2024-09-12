const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3005;
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'client/build')));

console.log('About to connect to MongoDB Atlas...');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected successfully'))
.catch(err => console.error('MongoDB Atlas connection error:', err));

// Define schemas
const chatHistorySchema = new mongoose.Schema({
  question: String,
  answer: String,
  timestamp: { type: Date, default: Date.now }
});

const formQuestionSchema = new mongoose.Schema({
  id: { type: String, index: true },
  text: String,
  questionDescription: String,
  answers: [{
    name: String,
    shortDescription: String,
    longDescription: String
  }]
});

// Create models
const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);
const FormQuestion = mongoose.model('FormQuestion', formQuestionSchema);

// Keep the existing questions array
const questions = [
  {
    id: 'qgoal',
    text: 'What are you looking to accomplish in your business?',
    options: [
      { id: '1newCustomers', name: 'New Customer', description: 'Looking to get new customers.' },
      { id: '1retention', name: 'Increased Retention', description: 'Looking to keep your customers coming back.' },
      { id: '1socialReach', name: 'More Social Reach', description: 'You want to expand your social reach and get people talking about your brand on social channels.' },
      { id: '1reviews', name: 'More Reviews', description: 'You\'re looking to get more reviews on your website.' },
      { id: '1sales', name: 'Increased Sales', description: 'Looking to increase overall sales.' }
    ]
  },
  {
    id: 'q2persona',
    text: 'Who are you looking to use to accomplish your goals?',
    options: [
      { id: '2oldCustomers', name: 'Old Customers', description: 'Create a program targeting customers that might have left your brand.' },
      { id: '2newCustomers', name: 'New Customers', description: 'Create a program that incentivizes new customers to buy from your brand.' },
      { id: '2influencers', name: 'Influencers', description: 'A program that helps you incentivize influencers to engage in a social partnership rather than a paid campaign.' },
      { id: '2affiliates', name: 'Affiliates', description: 'Find people who will help you drive sales by using their influence to get you customers and incentivize them to do that.' },
      { id: '2segment', name: 'Specific Segment', description: 'Target a specific segment of people who have done a certain thing.' },
      { id: '2otherBrand', name: 'Other Brand Customers', description: 'Create a collaborative campaign with another brand you know well.' }
    ]
  },
  {
    id: 'q3requirements',
    text: 'What are their requirements to qualify for your incentive program?',
    options: [
      { id: '3free', name: 'Free', description: 'Let people join your program for free.' },
      { id: '3register', name: 'Register', description: 'Users must register for your program to qualify.' },
      { id: '3lucky', name: 'Lucky Event', description: 'Someone hits something lucky that you set to qualify.' },
      { id: '3attendance', name: 'Event Attendance', description: 'Someone attends an event or webinar to qualify.' },
      { id: '3customerService', name: 'Customer Service', description: 'Customer service deems the user eligible and allows them to come in. Often forms.' },
      { id: '3application', name: 'Application', description: 'User applies to join and the brand either qualifies and accepts them or denies them.' },
      { id: '3pay', name: 'Pay to Play', description: 'The user pays a fee or membership fee to qualify for the program.' },
      { id: '3subscribe', name: 'Subscribe', description: 'The user must be on a subscription fee or product subscription to qualify for the program.' },
      { id: '3invitation', name: 'Invitation Only', description: 'The user must be invited and it\'s a private only program.' }
    ]
  },
  {
    id: 'q4behavior',
    text: 'What is the behavior that you\'re looking to incentivize?',
    options: [
      { id: '4purchase', name: 'Purchasing', description: 'Get the user to purchase product.' },
      { id: '4repeatPurchase', name: 'Repeat Purchasing', description: 'Get the user to purchase beyond 1 time.' },
      { id: '4smEngagement', name: 'Social Media Engagement', description: 'Get the user to be engaged on social media.' },
      { id: '4woM', name: 'Word of Mouth', description: 'Get the user to spread the word via word of mouth.' },
      { id: '4affiliateParticipation', name: 'Affiliate Participation', description: 'Get someone to drive the action for you and reward them for it.' },
      { id: '4reviews', name: 'Reviews', description: 'Get the user to give you more reviews for products, programs, or even the brand.' },
      { id: '4ugc', name: 'UGC', description: 'Get people to create content about your brand and products for you.' },
      { id: '4subscriptions', name: 'Subscriptions', description: 'Get users to get on subscription.' },
      { id: '4attendance', name: 'Attendance', description: 'Get users to attend an event.' },
      { id: '4milestone', name: 'Milestones', description: 'Get users to achieve a specified milestone.' },
      { id: '4challenges', name: 'Challenges', description: 'Get users to accomplish a specific challenge.' },
      { id: '4status', name: 'Status', description: 'Get users to unlock a certain status.' },
      { id: '4npsScore', name: 'NPS Score', description: 'Get users to give you feedback on your brand.' }
    ]
  },
  {
    id: 'q5Timing',
    text: 'When are users going to earn that reward?',
    options: [
      { id: '5immediate', name: 'Immediate', description: 'Users unlock the reward immediately after completing the behavior.' },
      { id: '5secondBehavior', name: 'Second Behavior', description: 'After the user performs a behavior for a second time.' },
      { id: '5timed', name: 'Timed', description: 'A time period after the user completes the behavior.' },
      { id: '5position', name: 'Position Based', description: 'Based on their position relative to the other qualified participants.' },
      { id: '5random', name: 'Random', description: 'A random user who completed the behavior will win.' }
    ]
  },
  {
    id: 'q6rewardType',
    text: 'What is the reward type that they\'re going to get for completing the behavior?',
    options: [
      { id: '6cash', name: 'Cash', description: 'The user will earn real cash for completing the behavior.' },
      { id: '6credits', name: 'Credits', description: 'The user will earn credits that they can use for product at your brand.' },
      { id: '6giftCards', name: 'Gift Cards', description: 'The user will earn gift cards that they can use at your store.' },
      { id: '6oBCredits', name: 'Other Brand Credit', description: 'The user will earn credits to other brands you work with.' },
      { id: '6freeShipping', name: 'Free Shipping', description: 'The user gets free shipping on an order.' },
      { id: '6specialPricing', name: 'Special Pricing', description: 'The user gets special pricing for completing the behavior.' },
      { id: '6exclusiveOffers', name: 'Exclusive Offers', description: 'The user gets a special offer.' },
      { id: '6earlyAccess', name: 'Early Access', description: 'The user gets early access to certain events or sales.' },
      { id: '6status', name: 'Status', description: 'The user unlocks a certain status or rank.' }
    ]
  },
  {
    id: 'q7calculations',
    text: 'How is the reward calculated?',
    options: [
      { id: '7fixedAmount', name: 'Fixed Amount', description: 'The reward is calculated as a fixed amount when they complete the action.' },
      { id: '7fixedPercent', name: 'Fixed Percent', description: 'The reward is a fixed % of the calculation method.' },
      { id: '7performanceBased', name: 'Performance Based', description: 'The reward is performance based on certain metrics to ensure you get the results you want and they get the results they want.' },
      { id: '7tiered', name: 'Tiered', description: 'A tiered program where your status or tier determines your rewards.' }
    ]
  },
  {
    id: 'q8earningPeriods',
    text: 'How many times can they earn the reward or how frequently can they earn the reward?',
    options: [
      { id: '8oneTime', name: 'One Time', description: 'The user can earn the reward one time.' },
      { id: '8weekly', name: 'Weekly', description: 'The user can earn the reward once a week.' },
      { id: '8monthly', name: 'Monthly', description: 'The user can earn the reward once a month.' },
      { id: '8nTimes', name: 'n Number of Times', description: 'The user can earn the rewards a certain number of times.' },
      { id: '8unlimited', name: 'Unlimited', description: 'The user can earn the reward an unlimited amount of times.' }
    ]
  },
  {
    id: 'q9beneficiary',
    text: 'Who is the person going to receive the reward?',
    options: [
      { id: '9user', name: 'User', description: 'The person who completed the behavior.' },
      { id: '9customer', name: 'Customer', description: 'The customer who completed the behavior.' },
      { id: '9specified', name: 'Specified Beneficiary', description: 'The beneficiary of the reward is specified beforehand.' },
      { id: '9companyCause', name: 'Company Cause', description: 'The reward goes to a cause specified by the company.' },
      { id: '9charity', name: 'Charity', description: 'The reward goes to a specified charity.' },
      { id: '9other', name: 'Other', description: 'The reward goes to someone other than any of the options.' }
    ]
  }
];

// Add this near the top of your routes
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Modify the API route
app.get('/api/questions', async (req, res) => {
  try {
    const cachedQuestions = cache.get('questions');
    if (cachedQuestions) {
      return res.json(cachedQuestions);
    }

    let dbQuestions = await FormQuestion.find().lean();
    
    if (dbQuestions.length === 0) {
      await FormQuestion.insertMany(questions);
      dbQuestions = questions;
    }
    
    cache.set('questions', dbQuestions);
    res.json(dbQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.json(questions); // Fallback to hardcoded questions if there's an error
  }
});

app.post('/api/chat-history', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const chatEntry = new ChatHistory({ question, answer });
    await chatEntry.save();
    res.status(201).json({ message: 'Chat history saved successfully' });
  } catch (error) {
    console.error('Error saving chat history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Error: Port ${port} is already in use. Please free up port ${port} or choose a different port.`);
    process.exit(1);
  } else {
    console.error(err);
  }
});