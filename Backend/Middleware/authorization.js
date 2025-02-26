// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; 
//   console.log('Authorization Header:', req.headers.authorization);
 
//   if (!token) {
//     return res.status(401).json({ message: 'Authentication required' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify and decode the token

//     req.userId = decoded.userId;
    
//     next();  // Call the next middleware/route handler
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = authenticate;


const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract token from header
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify and decode the token

    req.userId = decoded.userId;  // Set userId directly on the request object
    
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
