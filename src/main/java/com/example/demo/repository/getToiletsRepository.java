package com.example.demo.repository;

import com.example.demo.domain.Toilets;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class getToiletsRepository {
    @Autowired
    private DataSource dataSource;

    private Toilets rsToilet(ResultSet rs) throws SQLException {
        Toilets toilet = new Toilets();
        toilet.setIndex(rs.getString("Index"));
        toilet.setAddress(rs.getString("Address"));
        toilet.setLatitude(rs.getFloat("Latitude"));
        toilet.setLongitude(rs.getFloat("Longitude"));
        return toilet;
    }

    public List<Toilets> listToilets() {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT Index, Address, Latitude, Longitude FROM PublicToilets")) {
            List<Toilets> toilets = new ArrayList<>();
            while (rs.next()) toilets.add(rsToilet(rs));
            return toilets;
        } catch (SQLException e) {
            throw new SqlRepositoryException(e);
        }
    }


}
