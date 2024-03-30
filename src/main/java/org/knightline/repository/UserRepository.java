package org.knightline.repository;
@EnableScan
public interface UserRepository extends CrudRepository(UserRecord,String) {

}
