import { query } from 'express-validator';
import db from './db.js'
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const query_params = [name, email, passwordHash, default_role];
    
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const query_params = [email];
    
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (user === null){
        return null;
    }
    if (await verifyPassword(password, user.password_hash)){
        user['password_hash'] = null;
        return user;
    }
    return null;
}

const findAllUsers = async () => {
    const query = `
        SELECT u.user_id, u.name, u.email, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
    `;
    
    const result = await db.query(query);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows;
};

const userVolunteered = async (email) => {
    const query = `
        SELECT u.user_id, u.name, s.service_project_id, s.title, s.location, s.date
        FROM users u
        JOIN volunteered v
            ON v.user_id = u.user_id
        JOIN service_project s
            ON v.service_project_id = s.service_project_id
        WHERE u.email = $1
    `;

    const query_params = [email];
    const result = await db.query(query, query_params);
    return result.rows;
};

const volunteer = async (user_id, service_project_id) => {
    const query = `
        INSERT INTO volunteered (user_id,service_project_id)
        Values ($1,$2)
    `
    const query_params = [user_id, service_project_id];
    const result = await db.query(query, query_params);
    return result.rows[0];
}

const deletevolunteer = async (user_id, service_project_id) => {
    const query = `
        DELETE FROM volunteered WHERE user_id = $1 AND service_project_id = $2 
    `
    const query_params = [user_id, service_project_id];
    const result = await db.query(query, query_params);
    return result.rows[0];
}

const isVolunteer = async (user_id, service_project_id) => {
    const query = `
        SELECT u.user_id, u.name, s.service_project_id, s.title, s.location, s.date
        FROM users u
        JOIN volunteered v
            ON v.user_id = u.user_id
        JOIN service_project s
            ON v.service_project_id = s.service_project_id
        WHERE u.user_id = $1 AND s.service_project_id = $2
    `;

    const query_params = [user_id, service_project_id];
    const result = await db.query(query, query_params);
    console.log(result.rows);
    return result.rows[0];
}

export { createUser, authenticateUser, findAllUsers, userVolunteered, volunteer, deletevolunteer, isVolunteer };