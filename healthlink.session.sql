SHOW tables;

--@block
SELECT
    u.UserID,
    u.Username,
    u.Email,
    u.Role,
    u.Status,
    u.Verified,
    u.CreatedAt,
    u.UpdatedAt,
    u.LastLogin,
    ud.UserDetailID,
    ud.FirstName,
    ud.LastName,
    ud.DateOfBirth,
    ud.Gender,
    ud.Bio,
    ud.PhoneNumber,
    ud.Address,
    ud.ProfilePicture
FROM
    Users u
JOIN
    UserDetails ud ON u.UserID = ud.UserID;


--@block 
SELECT * from Users where  Email="falskdjflksdf"  OR UserName="falskdjflksdf"  LIMIT 1;

--@block 
delete from UserDetails;
