package com.example.demo.repository;

import com.example.demo.domain.Toilets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class GetToiletsRepository implements ToiletsRepository {
    @Autowired
    private DataSource dataSource;

    private Toilets rsToilet(ResultSet rs) throws SQLException {
        Toilets toilet = new Toilets();
        toilet.setIndex(rs.getString("Index"));
        toilet.setAddress(rs.getString("Address"));
        toilet.setLatitude(rs.getFloat("Latitude"));
        toilet.setLongitude(rs.getFloat("Longitude"));
        toilet.setHasChangingTable(rs.getInt("HasChangingTable"));
        toilet.setMustPay(rs.getInt("MustPay"));
        toilet.setIsHandicap(rs.getInt("IsHandicap"));
        toilet.setHours(rs.getString("Hours"));
        return toilet;
    }

    public List<Toilets> listToilets() {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM PublicToilets")) {
            List<Toilets> toilets = new ArrayList<>();
            while (rs.next()) toilets.add(rsToilet(rs));
            return toilets;
        } catch (SQLException e) {
            throw new SqlRepositoryException(e);
        }
    }


}
