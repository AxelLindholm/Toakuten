package com.example.demo.domain;

public class Toilets {
    private String index;
    private String address;
    private float latitude;
    private float longitude;

    public Toilets() {

    }
    public Toilets(String index, String address, float latitude, float longitude){
        this.index = index;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }
}
