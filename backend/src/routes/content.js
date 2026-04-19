const express = require('express');
const { protect } = require('../middleware/auth');
const Scheme = require('../models/Scheme');
const Mentor = require('../models/Mentor');
const Product = require('../models/Product');
const Opportunity = require('../models/Opportunity');

const router = express.Router();

// ─── Fallback Data (used if DB is empty) ─────────────────────────
const SCHEMES_SEED = [
  { name: "Beti Bachao Beti Padhao", category: "Education", benefits: "Financial assistance for girl child's education and welfare.", eligibility: "Girl Child", targetEmployment: "All", minAge: 0, maxAge: 25, maxIncome: 500000, officialLink: "https://wcd.nic.in/bbbp-schemes" },
  { name: "STEP", category: "Skill", benefits: "Skills that give employability to women in agriculture, retail, etc.", eligibility: "Women 16+", targetEmployment: "Unemployed", minAge: 16, maxAge: 35, maxIncome: 300000, officialLink: "https://wcd.nic.in/step" },
  { name: "Working Women Hostel", category: "Employment", benefits: "Safe and affordable accommodation for working women.", eligibility: "Working Women", targetEmployment: "Part-time", minAge: 18, maxAge: 35, maxIncome: 500000, officialLink: "https://wcd.nic.in/schemes/working-women-hostel" },
  { name: "Mahila E-Haat", category: "Business", benefits: "Online marketing platform to support women entrepreneurs.", eligibility: "Women Entrepreneurs", targetEmployment: "Self-employed", minAge: 18, maxAge: 60, maxIncome: 500000, officialLink: "http://mahilaehaat-rmk.gov.in/" },
  { name: "Pradhan Mantri Mudra Yojana", category: "Financial", benefits: "Loans up to ₹10 Lakhs for non-corporate, non-farm businesses.", eligibility: "Micro Businesses", targetEmployment: "Self-employed", minAge: 18, maxAge: 65, maxIncome: 1000000, officialLink: "https://www.mudra.org.in/" },
  { name: "Stand Up India", category: "Business", benefits: "Bank loans between ₹10 Lakhs to ₹1 Crore for setting up enterprises.", eligibility: "SC/ST/Women", targetEmployment: "Self-employed", minAge: 18, maxAge: 65, maxIncome: 10000000, officialLink: "https://www.standupmitra.in/" },
  { name: "PMEGP", category: "Business", benefits: "Credit-linked subsidy program for generating employment.", eligibility: "Any individual above 18", targetEmployment: "All", minAge: 18, maxAge: 65, maxIncome: 10000000, officialLink: "https://www.kviconline.gov.in/" },
  { name: "Deendayal Antyodaya Yojana (NRLM)", category: "Employment", benefits: "Organizing rural poor women into Self Help Groups (SHGs).", eligibility: "Rural Poor Women", targetEmployment: "Unemployed", minAge: 18, maxAge: 60, maxIncome: 300000, officialLink: "https://aajeevika.gov.in/" },
  { name: "PMKVY", category: "Skill", benefits: "Skill certification for industry-relevant training.", eligibility: "Unemployed Youth", targetEmployment: "Unemployed", minAge: 15, maxAge: 45, maxIncome: 500000, officialLink: "https://www.pmkvyofficial.org/" },
  { name: "Skill India", category: "Skill", benefits: "Various courses to enhance employability.", eligibility: "Anyone", targetEmployment: "All", minAge: 15, maxAge: 35, maxIncome: 500000, officialLink: "https://www.skillindia.gov.in/" },
  { name: "PMGDISHA", category: "Skill", benefits: "Making rural households digitally literate.", eligibility: "Rural Households", targetEmployment: "Homemaker", minAge: 14, maxAge: 60, maxIncome: 200000, officialLink: "https://www.pmgdisha.in/" },
  { name: "DDU-GKY", category: "Employment", benefits: "Adding diversity to incomes of rural poor families.", eligibility: "Rural Youth (15-35 yrs)", targetEmployment: "Unemployed", minAge: 15, maxAge: 35, maxIncome: 300000, officialLink: "http://ddugky.gov.in/" },
];

const MENTORS_SEED = [
  { name: "Anita Desai", role: "Tailoring Expert", experience: "15 yrs", location: "Pune, MH", rating: 4.9, available: true, image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Sneha Patil", role: "Small Business Coach", experience: "8 yrs", location: "Nagpur, MH", rating: 4.8, available: true, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Geeta Verma", role: "Handicraft Artisan", experience: "20 yrs", location: "Jaipur, RJ", rating: 5.0, available: false, image: "https://images.unsplash.com/photo-1610216705422-caa3bbb6d51e?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Kiran Rao", role: "Digital Marketing", experience: "5 yrs", location: "Mumbai, MH", rating: 4.7, available: true, image: "https://images.unsplash.com/photo-1531123897727-8f129e1b4dce?auto=format&fit=crop&q=80&w=200&h=200" },
];

const PRODUCTS_SEED = [
  { title: "Handwoven Cotton Saree", price: 1200, seller: "Meera Devi", village: "Phulia, WB", category: "Clothing", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400&h=300" },
  { title: "Terracotta Clay Pots", price: 350, seller: "Sita Kumhar", village: "Khurja, UP", category: "Home Decor", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400&h=300" },
  { title: "Organic Turmeric Powder", price: 180, seller: "Laxmi SHG", village: "Erode, TN", category: "Food & Spices", image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=400&h=300" },
  { title: "Bamboo Storage Baskets", price: 450, seller: "Asha Craft", village: "Bongaigaon, AS", category: "Handicrafts", image: "https://images.unsplash.com/photo-1596041695509-3286bf556488?auto=format&fit=crop&q=80&w=400&h=300" },
  { title: "Hand-painted Diya Set", price: 200, seller: "Jyoti Art", village: "Jaipur, RJ", category: "Handicrafts", image: "https://images.unsplash.com/photo-1542451313066-1c25cb10170a?auto=format&fit=crop&q=80&w=400&h=300" },
  { title: "Homemade Mango Pickle", price: 250, seller: "Kamla Auntie", village: "Ratnagiri, MH", category: "Food & Spices", image: "https://images.unsplash.com/photo-1610574229656-7883d6cb75b1?auto=format&fit=crop&q=80&w=400&h=300" },
];

const OPPORTUNITIES_SEED = [
  { title: "Anganwadi Worker", company: "Govt. of Maharashtra", location: "Pune District", type: "Full Time", state: "Maharashtra" },
  { title: "Retail Store Manager", company: "Reliance Smart", location: "Baner, Pune", type: "Full Time", state: "Maharashtra" },
  { title: "Boutique Assistant", company: "Kala Creations", location: "Kothrud, Pune", type: "Part Time", state: "Maharashtra" },
  { title: "Data Entry Operator", company: "Local Panchayat", location: "Shirur", type: "Contract", state: "Maharashtra" },
];

// ─── Helper: seed collection if empty ────────────────────────────
async function seedIfEmpty(Model, seedData) {
  const count = await Model.countDocuments();
  if (count === 0) {
    await Model.insertMany(seedData);
    console.log(`[Seed] Inserted ${seedData.length} records into ${Model.modelName}`);
  }
}

// Seed all collections on first request (lazy init)
let seeded = false;
async function ensureSeeded() {
  if (seeded) return;
  await seedIfEmpty(Scheme, SCHEMES_SEED);
  await seedIfEmpty(Mentor, MENTORS_SEED);
  await seedIfEmpty(Product, PRODUCTS_SEED);
  await seedIfEmpty(Opportunity, OPPORTUNITIES_SEED);
  seeded = true;
}

// ─── Routes ──────────────────────────────────────────────────────

// @desc    Get all government schemes
// @route   GET /api/content/schemes
router.get('/schemes', protect, async (req, res) => {
  try {
    await ensureSeeded();
    const schemes = await Scheme.find();
    res.status(200).json({ success: true, data: schemes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get all mentors
// @route   GET /api/content/mentors
router.get('/mentors', protect, async (req, res) => {
  try {
    await ensureSeeded();
    const mentors = await Mentor.find();
    res.status(200).json({ success: true, data: mentors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get all products
// @route   GET /api/content/products
router.get('/products', protect, async (req, res) => {
  try {
    await ensureSeeded();
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Add a product
// @route   POST /api/content/products
router.post('/products', protect, async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      userId: req.user._id,
      seller: req.user.name,
    });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get all local opportunities
// @route   GET /api/content/opportunities
router.get('/opportunities', protect, async (req, res) => {
  try {
    await ensureSeeded();
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: opportunities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get impact stats
// @route   GET /api/content/impact
router.get('/impact', protect, async (req, res) => {
  try {
    const User = require('../models/User');
    const [usersCount, productsCount, mentorsCount] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Mentor.countDocuments(),
    ]);
    res.status(200).json({
      success: true,
      data: {
        usersRegistered: usersCount,
        skillsLearned: Math.floor(usersCount * 2.3),  // simulated
        productsListed: productsCount,
        connectionsCount: Math.floor(usersCount * 5.9), // simulated
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
